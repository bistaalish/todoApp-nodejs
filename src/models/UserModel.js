const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../config/database'); // Replace this with your database connection setup
const bcrypt = require('bcrypt');

(async () => {
  try {
    await sequelize.sync(); // Synchronize the User model with the database
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 255], // Minimum and maximum length for the username
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Email format validation
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255], // Minimum and maximum length for the password
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users', // Replace 'users' with the actual table name in your database
  }
);

// ... (other model definitions)

User.prototype.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Authentication failed');
  }
};
// UserModel.js

User.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    try {
      const saltRounds = 10; // Ensure this is set to a valid value (e.g., 10)
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Error hashing password');
    }
  }
});
// Function to register a new user
async function registerUser(username, email, password) {
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    // Return the user data (excluding the password) after successful registration
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  } catch (error) {
    throw new Error('Error registering user');
  }
}

module.exports = {User,registerUser};
