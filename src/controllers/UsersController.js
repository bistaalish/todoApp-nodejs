// Import necessary modules and dependencies
const { User, registerUser } = require('../models/UserModel');
const { registerSchema, loginSchema } = require("../middlewares/validation");
const config = require("../config/config.js");
const jwt = require('jsonwebtoken');
const secretKey = config.JWT_SECRET; // Replace 'config.JWT_SECRET' with your actual secret key

// Registration function
const register = async (req, res) => {
  try {
    // Validate the incoming request data using the 'registerSchema'
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Extract required fields from the request body
    const { username, email, password } = req.body;

    // Check if the username or email is already in use
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already in use' });
    }

    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Register the new user using the 'registerUser' function from the model
    const newUser = await registerUser(username, email, password);

    // Return the newly registered user data (excluding the password)
    return res.status(201).json({
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Login function
const login = async (req, res) => {
  try {
    // Validate the incoming request data using the 'loginSchema'
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Extract required fields from the request body
    const { username, password } = req.body;

    // Find the user with the provided username
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create a JWT token with user information and a secret key
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      secretKey, // Replace 'secretKey' with your actual secret key
      { expiresIn: '1h' } // Token expires in 1 hour (you can set a different expiry time)
    );

    // Send the token as an HttpOnly cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // maxAge is set to 1 hour in milliseconds

    // Return the success message and the JWT token in the response
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const profile = async (req,res) => {
    try {
        const userProfile = req.user
        console.log(userProfile)
        return res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error})
    }
}

// Export the register and login functions as the module's public API
module.exports = {
  register,
  login,
  profile
};
