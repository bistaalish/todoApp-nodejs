const TaskModel = require("../models/tasksModel");
const sequelize = require("../config/database");
const {addTaskSchema} = require("../utils/validation")

const Task = TaskModel(sequelize);
const addTasks = async (newData) => {
    try{
        const error = addTaskSchema.validate(newData);
        if (error){
            return {"message":"Error Validation of User"}
        }
        const createTask = await this.Task.create(newData);
        return createTask;

    } catch (error){
        console.error("Error adding Tasks", error.message)
    }

}