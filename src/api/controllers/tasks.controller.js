const tasksService = require("../../service/tasks.service"); 

class TaskControllers {
    async addNewTask(req, res) {
        try {
            const addedTask = await tasksService.create(req.body);
            return res.status(201).json(addedTask); 
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    }
}

module.exports = TaskControllers;
