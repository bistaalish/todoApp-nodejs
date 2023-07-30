// Assuming you have Sequelize and pg (PostgreSQL) installed
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('./your_database_connection'); // Replace this with your database connection setup

class User extends Model {
  static associate(models) {
    // Define any associations with other models (if needed)
  }

  async comparePassword(password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }
}

User.init(
  {
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
  }
);

// Hash the password before saving to the database
User.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }
});

module.exports = User;
