const {User,registerUser} = require('../models/UserModel');
const {registerSchema,loginSchema} = require("../middlewares/validation");

const register = async (req,res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }
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

    // Register the new user using the registerUser function from the model
    const newUser = await registerUser(username, email, password);

    // Return the newly registered user data (excluding the password)
    return res.status(201).json({
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });  } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

const login = async (req,res) => {
    try {
  
        const { error } = loginSchema.validate(req.body);
  
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
  
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
  
        // Generate JWT token and send it in the response
        // (Implement JWT token generation according to your preferred library)
  
        return res.status(200).json({ message: 'Login successful', token: 'your_generated_token' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}
module.exports = {
    register,
    login,
  };