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
  mobile: { type: String, unique: true, sparse: true, default: null }, // Ensure default is null but sparse index
  crushOnYou: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  location: { type: locationSchema, default: {} },
  lastSeen: { type: Date, default: null },
});


const User = mongoose.model('User', userSchema); // Create the model
module.exports = User; // Export the model