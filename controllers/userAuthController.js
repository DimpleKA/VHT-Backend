const User = require('../models/Users')



// @desc - Registration of user
// @route - POST api/user/registerUser
// @access - PUBLIC
const registerUser = async (req, res) =>{
    console.log(req.body);
    return res.status(200).json({message:"khkjhk"})
try{
    const { given_name,family_name, name, picture, email, } =req.body;
    

    const documentCount = await User.countDocuments();
    const userId = `${email.split('@')[0]}-${documentNumber+1}`;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({
        name,
        userId,
        age,
        gender,
        profileImg: picture,
        email,
        mobile,
        location,
      });

      await newUser.save();

      return res.status(201).json({
        message: 'User registered successfully',
        userId,
      });

}
catch(error){
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
}
   
}

module.exports = {
  registerUser,
};
