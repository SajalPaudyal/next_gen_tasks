const express = require('express');
const router = express.Router();
const TaskControllers = require('../controllers/tasks.controller');
const UserController = require('../controllers/user.controller');
const confirmAuth = require('../middlewares/confirmAuth');
const taskControllers = new TaskControllers();
const userController = new UserController();

router.post('/tasks', confirmAuth, (req, res) => taskControllers.addNewTask(req, res));
router.get('/get-tasks', confirmAuth, (req, res) => taskControllers.getAllTasksByUserId(req, res));
router.get('/get-public-tasks', (req, res) => taskControllers.getAllPublicTasks(req, res));
router.post('/users', (req, res) => userController.createUser(req, res));
router.post('/signIn', (req, res) => userController.signInUser(req, res))
router.put('/tasks/:id/complete', confirmAuth, (req, res) => taskControllers.markTaskAsDone(req, res));
router.get('/userById',confirmAuth,  userController.findUser);

module.exports = router;
