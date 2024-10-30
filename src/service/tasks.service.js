const TasksModel = require("../models/tasks.model");
const res = require("express/lib/response");

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
            return await TasksModel.find({ user: userId }).populate("user", "firstname lastname _id");
        } catch (error) {
            throw new Error(`Could not find tasks : ${error}`);
        }
    }

    async getAllTasks() {
        try {
            return await TasksModel.find({ public: true }).populate("user", "firstname lastname _id");
        } catch (error) {
            throw new Error("Could not find all tasks");
        }
    }

    async modifyTaskStatus(taskId, userId) {
        try {
            const task = await TasksModel.findById(taskId).populate("user", "email");

            if (task.user._id.toString() === userId) {
                task.completed = true;
            }
            else {
                if (!task.completedBy.includes(userId)) {
                    task.completedBy.push(userId);
                }
            }

            console.log("Task:", task);
            console.log("Task User:", task ? task.user : "No task found");
            console.log("Completed By:", task ? task.completedBy : "No task found");
            const updatedTask = await task.save()

            return updatedTask;


        } catch (error) {
            console.error("Error in modifyTaskStatus:", error.message);
            throw new Error(`Could not modify task: ${error.message}`);
        }
    }


}

module.exports = new TaskService();
