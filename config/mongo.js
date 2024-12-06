const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    // Connect to MongoDB using the provided URI
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);  // Exit the process with failure code
  }
};

module.exports = connectDB;
