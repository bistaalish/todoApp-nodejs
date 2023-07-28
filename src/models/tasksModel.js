const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Task',
  }
);

// // Function to get all tasks from the database
// const getAllTasks = async () => {
//   try {
//     const tasks = await Task.findAll();
//     return tasks;
//   } catch (err) {
//     // Handle any errors that occurred during the fetch process
//     throw new Error('Failed to fetch tasks');
//   }
// };

// module.exports = { Task, getAllTasks };
module.exports = {Task}