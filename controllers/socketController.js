const socketIo = require('socket.io');
const User = require('../models/Users');

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
        const userId = socket.handshake.query.userId; // Retrieve userId from the handshake query
  console.log(`User connected: ${userId}`);
      console.log('A user connected: ' + socket.id);

      // Handle sending a message
      // Handle typing events
  socket.on('typing', (data) => {
    socket.broadcast.emit('user_typing', { userId: data.userId });
  });

  // Handle message sending
  socket.on('send_message', (message) => {
    io.emit('receive_message', message); // Broadcast the message to all users
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${userId}`);
  });

    });
  },
};

module.exports = socketController;
