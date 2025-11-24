import mongoose from 'mongoose';

const validStatuses = ['To Do', 'In Progress', 'Done'];

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: validStatuses,
            message: 'Status must be one of: To Do, In Progress, or Done'
        },
        default : 'To Do'
    },

    dueDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
});

export default Task;

