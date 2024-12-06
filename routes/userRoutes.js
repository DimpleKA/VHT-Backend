const express = require('express');
const router = express.Router();
const {registerUser, allUsers} = require('../controllers/userAuthController')



router.post('/registerUser', registerUser);   // http://localhost:3000/api/users/registerUser

router.post('/allUsers', allUsers);   // http://localhost:3000/api/users/allUsers



module.exports = router;