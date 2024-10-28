const tasksService = require("../../service/tasks.service"); 

class TaskControllers {
    async addNewTask(req, res) {
        try {
            const taskData ={
                ...req.body,
                user: req.user._id
            }
            const addedTask = await tasksService.create(taskData);
            return res.status(201).json(addedTask); 
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    }

    async getAllTasksByUserId(req, res) {
        try{
            const tasks = await tasksService.getUserTasks(req.user._id);
            return res.status(200).json(tasks);
        }
        catch(error) {
            throw new Error(`Could not find tasks : ${error}`);
        }
    }

    async getAllPublicTasks(req, res) {
        try {

        const publicTasks= await tasksService.getAllTasks();
        return res.status(200).json(publicTasks);
        }
        catch (error){
            throw new Error(`Could not find publicTasks : ${error}`);
        }

    }

}

module.exports = TaskControllers;
