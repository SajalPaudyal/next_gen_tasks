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
}

module.exports = new TaskService();
