const express = require('express');
const router = express.Router();
const {registerUser, allUsers} = require('../controllers/userAuthController');
const {sendMessage, viewMessage} = require('../controllers/messageController')



router.post('/registerUser', registerUser);   // http://localhost:3000/api/users/registerUser

router.post('/allUsers',  allUsers);   // http://localhost:3000/api/users/allUsers

router.post('/viewMessage',  viewMessage);   // http://localhost:3000/api/users/viewMessage

module.exports = router;