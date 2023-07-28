const {Task} = require("../models/tasksModel");
const sequelize = require("../config/database");
// const {addTaskSchema} = require("../utils/validation")


// Function to add a new task and insert data into the TasksModel
const addTask = async (title, description, completed = false) => {
    try {
      // Create a new task with the provided data
      const newTask = await Task.create({
        title,
        description,
        completed,
      });
  
      return newTask;
    } catch (err) {
        console.error(err)
      // Handle any errors that occurred during the insertion process
      throw new Error('Failed to add new task');
    }
  };

// Function to get all tasks from the database
const getAllTasks = async () => {
    try {
      const tasks = await Task.findAll();
      return tasks;
    } catch (err) {
      // Handle any errors that occurred during the fetch process
      throw new Error('Failed to fetch tasks');
    }
  };

// Function to check if a title already exists in the TasksModel
const isTitleExist = async (title) => {
    try {
      const task = await Task.findOne({ where: { title } });
      return !!task; // If task exists, return true; otherwise, return false
    } catch (err) {
      // Handle any errors that occurred during the fetch process
      throw new Error('Failed to check title existence');
    }
  };
// Function to get a specific task by ID from the database
const getTaskById = async (taskId) => {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    } catch (err) {
      // Handle any errors that occurred during the fetch process
      throw new Error('Failed to fetch task');
    }
  };

  // Function to update a task based on its id and return the updated data
const updateTask = async (id, updatedData) => {
    try {
      // Find the task by id
      const task = await Task.findByPk(id);
  
      if (!task) {
        throw new Error('Task not found'); // Task with the given id does not exist
      }
  
      // Update the task with the provided data
      const updatedTask = await task.update(updatedData);
  
      return updatedTask;
    } catch (err) {
      // Handle any errors that occurred during the update process
      throw new Error('Failed to update task');
    }
  };
  
// Function to mark a task as completed based on its id
const completeTask = async (id) => {
    try {
      // Find the task by id
      const task = await Task.findByPk(id);
    //   console.log(task)
  
      if (!task) {
        throw new Error('Task not found'); // Task with the given id does not exist
      }
  
      // Mark the task as completed by setting the completed property to true
      const updatedTask = await task.update({ completed: true });
  
      return updatedTask;
    } catch (err) {
      // Handle any errors that occurred during the update process
      throw new Error('Failed to complete task');
    }
  };

// Function to delete a task based on its id
const deleteTask = async (id) => {
    try {
      // Find the task by id
      const task = await Task.findByPk(id);
  
      if (!task) {
        throw new Error('Task not found'); // Task with the given id does not exist
      }
  
      // Delete the task from the database
      await task.destroy();
  
      return 'Task deleted successfully';
    } catch (err) {
      // Handle any errors that occurred during the delete process
      throw new Error('Failed to delete task');
    }
  };
module.exports = {deleteTask,addTask,getAllTasks,getTaskById,isTitleExist,updateTask,completeTask}