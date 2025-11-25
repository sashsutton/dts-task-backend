import Task from '../models/Task.js';

export const isEmpty = (value) => value === null || value === undefined || value === '';

export const validateTaskInput = (req, res, next) => {
    const { title, status, dueDate } = req.body;

    if (isEmpty(title)) {
        return res.status(400).json({ error: 'Validation Error', details: 'Title is required.' });
    }
    if (isEmpty(status)) {
        return res.status(400).json({ error: 'Validation Error', details: 'Status is required.' });
    }
    if (isEmpty(dueDate)) {
        return res.status(400).json({ error: 'Validation Error', details: 'Due date is required.' });
    }

    if (isNaN(new Date(dueDate).getTime())) {
        return res.status(400).json({ error: 'Validation Error', details: 'Due date must be a valid date/time format.' });
    }

    const validStatuses = Task.schema.path('status').enumValues;
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            error: 'Validation Error',
            details: `Status must be one of: ${validStatuses.join(', ')}.`
        });
    }

    next();
};