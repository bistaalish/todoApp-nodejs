const express = require("express");
const {validateTaskData,validateUpdateTask} = require("../middlewares/validation")
// const {getAllTasks} = require("../models/tasksModel")
const {completedTask,DeleteTask,UpdateTask,getTaskByID,GetTasks,AddTask} = require("../controllers/TasksController");
// const {addTaskSchema} = require("../utils/validation");
const router = express.Router();

//  Route: POST /api/tasks
//  Feature Create a new task
//  Input: { "id": string, "title": string, "description": string}
//  Output: { "id": string, "title": string, "description": string, "completed": boolean }
//  Error Messages: - Invalid or missing title/description
router.post("/tasks",validateTaskData,AddTask)

// Route: GET /api/tasks
// Feature: Get all tasks
// Input: None 
// Output: Array of task objects
// Error Messages: - Error fetching tasks
router.get("/tasks",GetTasks);

// Route: GET /api/tasks/:id
// Feature: Get a specific task by ID
// Input: Tasks ID as a route parameter
// Output: Task Object
// Error Messages: - Task not found
router.get("/tasks/:id",getTaskByID);

// Route: PUT /api/tasks/:id
// Feature: Update a task
// Input: Tasks ID as a route parameter
// Output: Updated Task Object
// Error Messages: - Task not found<br>- Invalid or missing title/description
router.put("/tasks/:id",validateUpdateTask,UpdateTask);

// Route: DELETE /api/tasks/:id
// Feature: DELETE a task
// Input: Tasks ID as a route parameter
// Output: { "message": string }
// Error Messages: - Task not found
router.delete("/tasks/:id",DeleteTask);

// Route: PUT /api/tasks/:id/complete
// Feature: Mark task as completed
// Input: Tasks ID as a route parameter
// Output: Updated task object with completed set to true
// Error Messages: - Task not found
router.get("/tasks/:id/completed",completedTask)

module.exports = router;