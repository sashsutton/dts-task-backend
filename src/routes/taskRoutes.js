import express from 'express';
import Task from '../models/Task.js';
import { validateTaskInput } from '../middleware/taskValidation.js';

const router = express.Router();


router.post('/tasks', validateTaskInput, async (req, res) => {
    try {

        const newTask = await Task.create(req.body);

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });

    } catch (error) {

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            console.error('Mongoose Validation Error:', messages.join(', '));
            return res.status(400).json({
                error: 'Mongoose Validation Failed',
                details: messages
            });
        }

        console.error("Database or Server Error:", error);
        res.status(500).json({
            error: 'Internal Server Error',
            details: 'Could not create task due to a server or database issue.'
        });
    }
});

export default router;