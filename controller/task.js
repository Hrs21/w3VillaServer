const {Task} = require('../models/task');

async function createTask(req, res) {
    try {
        const { title, description, dueDate, userId } = req.body;

        // Create new task
        const newTask = new Task({
            title,
            description,
            user: userId,
            dueDate
        });

        // Save task to database
        await newTask.save();

        const tasks = await Task.find({user: userId});

        res.status(201).json({ success:true, tasks, message: 'Task created successfully' });

    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error', error: error.message });
    }
}

async function updateTask(req, res) {
    try {

        const {taskId} = req.params;
        const {status} = req.body;

        // Find task by id
        const task = await Task.findByIdAndUpdate(taskId, {
            status: status
        },{new: true});
        
        if (!task) {
            return res.json({success:false, message: 'Task not found' });
        }
       

        // Save task to database
        await task.save();

        res.status(200).json({success:true, message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error', error: error.message });
    }
}

async function deleteTask(req, res) {
    try {
        const {taskId} = req.params;

        // Find task by id
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.json({success:false, message: 'Task not found' });
        }
        res.status(200).json({success:true, message: 'Task deleted successfully' });

    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error', error: error.message });
    }
}

async function getTasks(req, res) {
    try {
        const {userId} = req.body;

        // Find all tasks by user id
        const tasks = await Task.find({user: userId});
        res.status(200).json({ tasks });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    
}

module.exports = { createTask, updateTask, deleteTask, getTasks };