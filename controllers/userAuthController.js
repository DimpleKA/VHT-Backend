//const { admin, db } = require("../config/firebase");  Update the path based on your project structure



// @desc - Registration of user
// @route - POST api/user/registerUser
// @access - PUBLIC
const registerUser = async (req, res) =>{
    console.log(req.body);
    return res.status(200).json({message:"khkjhk"})
}

module.exports = {
  registerUser,
};
