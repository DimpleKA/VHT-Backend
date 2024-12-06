const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/userAuthController')



router.post('/registerUser', registerUser);   // http://localhost:3000/api/users/registerUser



module.exports = router;