const socketIo = require('socket.io');

let io;

const socketController = {
  init: (server) => {
    // Initialize Socket.io with the server
    io = socketIo(server, {
      cors: {
        origin: "http://localhost:5173", // Allow frontend to access the socket server
        methods: ["GET", "POST"]
      }
    });

    // When a new user connects, listen for events
    io.on('connection', (socket) => {
      console.log('A user connected: ' + socket.id);

      // Handle sending a message
      socket.on('send_message', (message) => {
        console.log('Message received: ', message);
        // Emit the message to the intended recipient
        io.to(message.receiverId).emit('receive_message', message);
      });

      // Listen for typing events
      socket.on('typing', (data) => {
        socket.broadcast.emit('user_typing', data);  // Broadcast typing status to others
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
      });
    });
  },
};

module.exports = socketController;
