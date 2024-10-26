const express = require('express');
const router = express.Router();
const TaskControllers = require('../controllers/tasks.controller');
const UserController = require('../controllers/user.controller');
const taskControllers = new TaskControllers();
const userController = new UserController();

router.post('/tasks', (req, res) => taskControllers.addNewTask(req, res));
router.post('/users', (req, res) => userController.createUser(req, res));
router.post('/signIn', (req, res) => userController.signInUser(req, res))

module.exports = router;
