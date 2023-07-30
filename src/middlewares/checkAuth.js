const jwt = require('jsonwebtoken');
const config = require("../config/config.js")
const secretKey = config.JWT_SECRET

// Middleware function to check if the request is authenticated
function checkAuth(req, res, next) {
  try {
    // Get the JWT token from the cookie named 'jwt'
    const token = req.cookies.token;

    // If the token is not found or empty, the request is not authenticated
    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }

    // Verify the token using the secret key
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden (invalid token)
      }

      // The token is valid. Attach the user object to the request for further use
      req.user = user;
      next(); // Proceed to the protected route
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500); // Internal server error
  }
}

module.exports = {
  checkAuth,
};
