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
        methods: ["GET", "POST"]
      }
    });

    // When a new user connects, listen for events
    io.on('connection', (socket) => {
      const userId = socket.handshake.query.userId; // Retrieve userId from the handshake query
      console.log(`User connected: ${userId}`);
      console.log('A user connected: ' + socket.id);

      // Find user in the database (assume userId is unique)
      User.findOne({ userId })
        .then(user => {
          if (user) {
            // Notify everyone that the user is online
            io.emit('user_online', { userId: userId, username: user.name });
          }
        })
        .catch(err => console.error('Error fetching user:', err));

      // Handle typing events
      socket.on('typing', (data) => {
        socket.broadcast.emit('user_typing', { userId: data.userId });
      });

      // Handle message sending
      socket.on('send_message', async (message) => {
        console.log('Message received from client:', message);
      
        try {
          // Save the message to the database
          const savedMessage = await Message.create({
            sender: message.from,     // Assuming `message.sender` contains the sender's ID
            receiver: message.to, // Assuming `message.receiver` contains the receiver's ID
            content: message.content,   // Assuming `message.content` contains the message content
            timestamp: new Date(),      // Optional if you want to override default
          });
      
          console.log('Message saved to database:', savedMessage);
      
          // Broadcast the saved message to all users (or specific users if needed)
          io.emit('receive_message', savedMessage);
        } catch (err) {
          console.error('Error saving message:', err);
        }
      });
      
      

      // Handle user disconnect
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${userId}`);
        // Optionally, you can notify that the user has gone offline
        io.emit('user_offline', { userId: userId });
      });
    });
  },
};

module.exports = socketController;
