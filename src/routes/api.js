const express = require("express");
const router = express.Router();

//  Route: POST /api/tasks
//  Feature Create a new task
//  Input: { "id": string, "title": string, "description": string}
//  Output: { "id": string, "title": string, "description": string, "completed": boolean }
//  Error Messages: - Invalid or missing title/description
router.post("/tasks",(req,res)=>{
    res.status(400).json({"test":"successful"});
});

// Route: GET /api/tasks
// Feature: Get all tasks
// Input: None 
// Output: Array of task objects
// Error Messages: - Error fetching tasks
router.get("/tasks",(req,res)=>{
    res.status(400).json({"test":"successful"});
});
// Route: GET /api/tasks/:id
// Feature: Get a specific task by ID
// Input: Tasks ID as a route parameter
// Output: Task Object
// Error Messages: - Task not found
router.get("/tasks/:id",(req,res)=>{
    const taskId = req.params.id;
    res.status(200).json({taskId});
});
// Route: PUT /api/tasks/:id
// Feature: Update a task
// Input: Tasks ID as a route parameter
// Output: Updated Task Object
// Error Messages: - Task not found<br>- Invalid or missing title/description
router.put("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id);
    res.status(200).json({taskId});
});
// Route: DELETE /api/tasks/:id
// Feature: DELETE a task
// Input: Tasks ID as a route parameter
// Output: { "message": string }
// Error Messages: - Task not found
router.delete("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id);
    res.status(200).json({taskId});
});
// Route: PUT /api/tasks/:id/complete
// Feature: Mark task as completed
// Input: Tasks ID as a route parameter
// Output: Updated task object with completed set to true
// Error Messages: - Task not found
router.get("/tasks/:id/completed",(req,res)=>{
    const taskId = parseInt(req.params.id);
    res.status(200).json({taskId});
});
module.exports = router;