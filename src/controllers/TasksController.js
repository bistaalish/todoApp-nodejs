const {Task} = require("../models/tasksModel");
const sequelize = require("../config/database");
// const {addTaskSchema} = require("../utils/validation")


// Function to add a new task and insert data into the TasksModel
const addTask = async (title, description,username, completed = false) => {
    try {
      // Create a new task with the provided data
      const newTask = await Task.create({
        title,
        description,
        completed,
        username
      });
  
      return newTask;
    } catch (err) {
        console.error(err)
      // Handle any errors that occurred during the insertion process
      throw new Error('Failed to add new task');
    }
  };

// Function to get all tasks from the database
const getAllTasks = async (username) => {
    try {
      const tasks = await Task.findAll({ where: { username } });
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
const getTaskById = async (taskId,username) => {
    try {
      const task = await Task.findAll({ where: { username,id:taskId } });
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

  const AddTask = async (req,res) => {
    try {
      const username = req.user.username
      const {title,description} = req.body;
      const alreadyExists = await isTitleExist(title);
      if (alreadyExists){
          return res.status(400).json({"Error":"Task Title Already Exists"})
      }
      const newTask = await addTask(title,description,username)
      res.status(200).json(newTask);
  } catch (error) {
      console.error("Error adding task")
      res.status(400).json({error})
  }
  }

const GetTasks = async (req,res) => {
  try {
    const username = req.user.username
    const tasks = await getAllTasks(username);
    if(tasks.length === 0 ){
        return res.status(404).json({"Error":"Error fetching tasks"})
    }
    return res.status(200).json(tasks);
} catch (error){
    console.log(error);
    return res.status(404).json({"message": " Error fetching tasks"})
}
}

const getTaskByID = async (req,res) => {
  try {
    const username = req.user.username;
    const taskId = req.params.id;
    const task = await getTaskById(taskId,username);
    
    // Check if task is empty;
    if(task.length ===0) {
      return res.status(401).json({error: "No such task found in your database."})
    }
    res.status(200).json(task);
}catch(error){
    res.status(404).json({"error": "Task not found"});
}
}
const UpdateTask = async (req,res) => {
  try {
    const taskId = parseInt(req.params.id);
    const updatedData = req.body;
    // res.status(200).json(updatedData);
    const updatedTask = await updateTask(taskId,updatedData)
    res.status(200).json(updatedTask);
} catch (error) {
    return res.status(500).json({"Error":"Task not found"})
}
}

const DeleteTask = async (req,res) => {
  try {
    const taskId = parseInt(req.params.id);
    const message = await deleteTask(taskId)
    res.status(200).json({message:message});
   } catch (error){
    return res.status(500).json({"Error":"Failed to delete Task"})
   }
}

const completedTask = async (req,res) => {
      // res.status(200).json(req.params.id);
      try {
        const taskId = parseInt(req.params.id);
        const completedTask = await completeTask(taskId)
        res.status(200).json(completedTask)
    } catch (err) {
        return res.status(500).json({"Error":"Task not found"})
    }
}
module.exports = {completedTask,DeleteTask,UpdateTask,getTaskByID,GetTasks,AddTask}