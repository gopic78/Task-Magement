const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    dueDate: {
        type: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

module.exports = mongoose.model("task_management", TaskSchema);
