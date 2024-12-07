const User = require('../models/Users');
const Message = require('../models/Messages')
const { jwtEncode } = require('../middlewares/jwt'); // Import the jwtEncode function

// @desc - Registration of user
// @route - POST api/user/registerUser
// @access - PUBLIC
// Controller for registering a user
const registerUser = async (req, res) => {
  try {
    const { given_name, family_name, name, picture, email, age, gender,  location } = req.body;

    // Generate a unique userId
    const documentCount = await User.countDocuments();
    const userId = `${email.split('@')[0]}${documentCount + 1}`;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
  

      const token = await jwtEncode({
        userId: existingUser.userId,
        email: existingUser.email,
        name: existingUser.name,
        profileImg: existingUser.profileImg,
      });
  
      // Respond with success and include the JWT token
      return res.status(201).json({
        message: 'User registered successfully',
        userId: newUser.userId,
        token, // Send JWT token
      });
    }

    // Create a new user
    const newUser = new User({
      name: name || `${given_name} ${family_name}`, // Use given_name and family_name if name is not provided
      userId,
      age: age || null, // Default to null if age is not provided
      gender: gender || null, // Default to null if gender is not provided
      profileImg: picture || null, // Default to null if picture is not provided
      email,
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
        const user = await User.find();
        return res.status(200).json({user });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  




  // const allUsers = async (req, res) => {
  //   const { loggedInUser } = req.body;
  
  //   try {
  //     // Fetch all users except the logged-in user
  //     const users = await User.find({ userId: { $ne: loggedInUser } });
  
  //     // Fetch last messages for each user concurrently
  //     const usersWithMessages = await Promise.all(
  //       users.map(async (user) => {
  //         try {
  //           // Fetch the last message exchanged between loggedInUser and the current user
  //           const lastMessage = await Message.findOne({
  //             $or: [
  //               { sender: loggedInUser, receiver: user.userId },
  //               { sender: user.userId, receiver: loggedInUser },
  //             ],
  //           })
  //             .sort({ timestamp: -1 }) // Sort by the latest timestamp
  //             .select("content timestamp");
  
  //           return {
  //             ...user.toObject(), // Convert Mongoose document to plain object
  //             lastMessage: lastMessage ? lastMessage.content : "No message found",
  //           };
  //         } catch (err) {
  //           console.error(`Error fetching last message for user ${user.userId}:`, err);
  //           return {
  //             ...user.toObject(),
  //             lastMessage: "No message found",
  //           };
  //         }
  //       })
  //     );
  
  //     return res.status(200).json(usersWithMessages);
  //   } catch (error) {
  //     console.error("Error fetching users or messages:", error);
  //     return res.status(500).json({ message: "Internal Server Error" });
  //   }
  // };
  




module.exports = {
  registerUser,
  allUsers,
};
