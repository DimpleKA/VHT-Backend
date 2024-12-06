const mongoose = require('mongoose');
const { Schema } = mongoose; // Correctly import Schema from mongoose

// Define location schema
const locationSchema = new Schema({
    latitude: { type: String, default: null },
    longitude: { type: String, default: null },
});

// Define user schema
const userSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  age: { type: String, default: null },
  gender: { type: String, default: null },
  profileImg: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, unique: true, sparse: true }, // Sparse index
  crushOnYou: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Reference to other users
  location: { type: locationSchema, default: {} }, // Properly define location as a subdocument
  lastSeen: { type: Date, default: null }, // Add lastSeen field
});

const User = mongoose.model('User', userSchema); // Create the model
module.exports = User; // Export the model