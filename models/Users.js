const mongoose = require('mongoose');
const { Schema } = mongoose;  // Correctly import Schema from mongoose

// Define location schema
const locationSchema = new Schema({
    latitude: String,
    longitude: String,
});

// Define user schema
const userSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  age: { type: String },
  gender: { type: String },
  profileImg: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  crushOnYou: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Reference to other users
  location: { type: locationSchema } // Properly define location as a subdocument
});

const User = mongoose.model('User', userSchema);  // Create the model

module.exports = User;  // Export the model
