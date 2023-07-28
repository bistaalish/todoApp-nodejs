const express = require("express");
const {validateTaskData,validateUpdateTask} = require("../middlewares/validation")
// const {getAllTasks} = require("../models/tasksModel")
const {deleteTask,getAllTasks,getTaskById,isTitleExist, addTask,updateTask, completeTask} = require("../controllers/TasksController");
// const {addTaskSchema} = require("../utils/validation");
const router = express.Router();

//  Route: POST /api/tasks
//  Feature Create a new task
//  Input: { "id": string, "title": string, "description": string}
//  Output: { "id": string, "title": string, "description": string, "completed": boolean }
//  Error Messages: - Invalid or missing title/description
router.post("/tasks",validateTaskData,async (req,res)=>{
    try {
        const {title,description} = req.body;
        const alreadyExists = await isTitleExist(title);
        if (alreadyExists){
            return res.status(400).json({"Error":"Task Title Already Exists"})
        }
        const newTask = await addTask(title,description)
        res.status(200).json(newTask);
    } catch (error) {
        console.error("Error adding task")
        res.status(400).json({error})
    }
});

// Route: GET /api/tasks
// Feature: Get all tasks
// Input: None 
// Output: Array of task objects
// Error Messages: - Error fetching tasks
router.get("/tasks",async (req,res)=>{
    try {
        const tasks = await getAllTasks();
        if(tasks.length === 0 ){
            return res.status(404).json({"Error":"Error fetching tasks"})
        }
        return res.status(200).json(tasks);
    } catch (error){
        console.log(error);
        return res.status(404).json({"message": " Error fetching tasks"})
    }
});
// Route: GET /api/tasks/:id
// Feature: Get a specific task by ID
// Input: Tasks ID as a route parameter
// Output: Task Object
// Error Messages: - Task not found
router.get("/tasks/:id",async (req,res)=>{
    try {
        const taskId = req.params.id;
        const task = await getTaskById(taskId);
        res.status(200).json(task);
    }catch(error){
        res.status(404).json({"error": "Task not found"});
    }
});
// Route: PUT /api/tasks/:id
// Feature: Update a task
// Input: Tasks ID as a route parameter
// Output: Updated Task Object
// Error Messages: - Task not found<br>- Invalid or missing title/description
router.put("/tasks/:id",validateUpdateTask,async (req,res)=>{
    try {
        const taskId = parseInt(req.params.id);
        const updatedData = req.body;
        // res.status(200).json(updatedData);
        const updatedTask = await updateTask(taskId,updatedData)
        res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({"Error":"Task not found"})
    }
});
// Route: DELETE /api/tasks/:id
// Feature: DELETE a task
// Input: Tasks ID as a route parameter
// Output: { "message": string }
// Error Messages: - Task not found
router.delete("/tasks/:id",async (req,res)=>{
   try {
    const taskId = parseInt(req.params.id);
    const message = await deleteTask(taskId)
    res.status(200).json({message:message});
   } catch (error){
    return res.status(500).json({"Error":"Failed to delete Task"})
   }
});
// Route: PUT /api/tasks/:id/complete
// Feature: Mark task as completed
// Input: Tasks ID as a route parameter
// Output: Updated task object with completed set to true
// Error Messages: - Task not found
router.get("/tasks/:id/completed",async (req,res)=>{
    // res.status(200).json(req.params.id);
    try {
        const taskId = parseInt(req.params.id);
        const completedTask = await completeTask(taskId)
        res.status(200).json(completedTask)
    } catch (err) {
        return res.status(500).json({"Error":"Task not found"})
    }
});
module.exports = router;