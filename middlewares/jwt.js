const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SALT; // Make sure you have this in your environment variables

// Encode JWT
const jwtEncode = async (data) => {
  try {
    const encodedData = jwt.sign(
      {
        userId: data.userId,
        userEmail: data.email,
        name: data.name,
        imgUrl: data.profileImg,
      },
      SECRET_KEY, // Secret key
      { expiresIn: '1h' } // Token validity (1 hour)
    );

    return encodedData;
  } catch (error) {
    console.error('Error encoding JWT:', error);
  }
};

// Decode JWT
const jwtDecode = async (token) => {
  try {
    const decodedData = jwt.verify(token, SECRET_KEY); // Verify and decode the token
    return decodedData; // This will contain the payload of the JWT
  } catch (error) {
    console.error('Error decoding JWT:', error);
    throw new Error('Invalid token');
  }
};

module.exports = {
  jwtEncode,
  jwtDecode,
};
