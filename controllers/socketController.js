const socketIo = require('socket.io');
const User = require('../models/Users');
const Message = require('../models/Messages');

let io;

const socketController = {
  init: (server) => {
    // Initialize Socket.io with the server
    io = socketIo(server, {
      cors: {
        origin: "*", // Allow frontend to access the socket server
        methods: ["GET", "POST"],
      },
    });

    // Handle user connections
    io.on('connection', (socket) => {
      const userId = socket.handshake.query.userId; // Retrieve userId from the handshake query
      console.log(`User connected: ${userId} (Socket ID: ${socket.id})`);

      // Mark user as online and notify others
      User.findOne({ userId })
        .then((user) => {
          if (user) {
            io.emit('user_online', { userId, username: user.name });
          }
        })
        .catch((err) => console.error('Error fetching user:', err));

      // Listen for typing events
      socket.on('typing', (data) => {
        const { from, to } = data; // `from` is the sender, `to` is the intended recipient
        socket.to(to).emit('user_typing', { from }); // Notify only the recipient
        console.log(`${from} is typing to ${to}`);
      });

      // Handle sending messages
      socket.on('send_message', async (message) => {
        const { from, to, content } = message;

        try {
          // Save message to the database
          const savedMessage = await Message.create({
            sender: from,
            receiver: to,
            content,
            timestamp: new Date(),
          });

          console.log('Message saved to database:', savedMessage);

          // Notify the sender and receiver with the new message
          io.to(socket.id).emit('receive_message', savedMessage); // Notify the sender
          socket.to(to).emit('receive_message', savedMessage); // Notify the recipient
        } catch (err) {
          console.error('Error saving message:', err);
        }
      });

      // Handle user disconnection
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${userId}`);
        io.emit('user_offline', { userId }); // Notify that the user is offline
      });
    });
  },
};

module.exports = socketController;
