const User = require('../models/Users');
const { jwtEncode } = require('../middlewares/jwt'); // Import the jwtEncode function

// @desc - Registration of user
// @route - POST api/user/registerUser
// @access - PUBLIC
// Controller for registering a user
const registerUser = async (req, res) => {
  try {
    const { given_name, family_name, name, picture, email, age, gender, mobile, location } = req.body;

    // Generate a unique userId
    const documentCount = await User.countDocuments();
    const userId = `${email.split('@')[0]}${documentCount + 1}`;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user
    const newUser = new User({
      name: name || `${given_name} ${family_name}`, // Use given_name and family_name if name is not provided
      userId,
      age: age || null, // Default to null if age is not provided
      gender: gender || null, // Default to null if gender is not provided
      profileImg: picture || null, // Default to null if picture is not provided
      email,
      mobile: mobile || null, // Default to null if mobile is not provided
      location: location || { latitude: null, longitude: null }, // Default to an empty location object
    });

    // Save the user to the database
    await newUser.save();

    // Generate the JWT token after successful registration
    const token = await jwtEncode({
      userId: newUser.userId,
      email: newUser.email,
      name: newUser.name,
      profileImg: newUser.profileImg,
    });

    // Respond with success and include the JWT token
    return res.status(201).json({
      message: 'User registered successfully',
      userId: newUser.userId,
      token, // Send JWT token
    });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



// @desc - list of all users
// @route - POST api/user/allUsers
// @access - PRIVATE
// Controller for registering a user
const allUsers = async (req, res) => {
    try {

  
      // Generate a unique userId
      const users = await User.find();
   
      return res.status(200).json({ data: users});
  

  
     
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


module.exports = {
  registerUser,
  allUsers,
};
