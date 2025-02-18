const mongoose = require('mongoose');
// Task Schema
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'In-progress', 'completed'], default: 'pending' },
    dueDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });



const Task = mongoose.model('Task', TaskSchema);
module.exports = { Task };