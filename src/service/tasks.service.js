const TasksModel = require("../models/tasks.model");

class TaskService {
    async create(task) {
        try {
            const newTask = new TasksModel(task);
            await newTask.save();
            return newTask;
        } catch (error) {
            throw new Error("Task creation failed");
        }
    }

    async getUserTasks(userId) {
        try {
            return await TasksModel.find({user: userId}).populate("user", "firstname lastname -_id");
        } catch (error) {
            throw new Error(`Could not find tasks : ${error}`);
        }
    }

    async getAllTasks(){
        try {
            return await TasksModel.find({public: true})
        }
        catch(error) {
            throw new Error("Could not find all tasks");
        }
    }
}

module.exports = new TaskService();
