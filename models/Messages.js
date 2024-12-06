const mongoose = require('mongoose'); // Fixed typo in `require`

const messageSchema = new mongoose.Schema({
  sender: {
    type:String, // Reference to the user sending the message
    ref: 'User',
    required: true,
  },
  receiver: {
    type:String, // Reference to the user receiving the message
    ref: 'User',
    required: true,
  },
  content: {
    type: String, // The actual message content
    required: true,
  },
  timestamp: {
    type: Date, // When the message was sent
    default: Date.now,
  },
  status: {
    type: String, // e.g., 'sent', 'delivered', 'read'
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
  isDeleted: {
    type: Boolean, // Indicates if the message was deleted by the sender or receiver
    default: false,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
