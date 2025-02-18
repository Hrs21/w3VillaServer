const express = require('express');
const  { createTask, updateTask, deleteTask, getTasks} = require('../controller/task');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

router.post('/task', authenticateUser,   createTask);
router.put('/task/:taskId',authenticateUser,  updateTask);
router.delete('/task/:taskId',authenticateUser,  deleteTask);
router.get('/tasks', authenticateUser, getTasks);

module.exports = router;