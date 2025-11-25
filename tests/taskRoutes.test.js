import { test, describe, beforeEach, mock } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import express from 'express';

import Task from '../src/models/Task.js';
import taskRoutes from '../src/routes/taskRoutes.js';

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);

describe('POST /api/tasks', () => {

    const createMock = mock.method(Task, 'create');

    beforeEach(() => {
        createMock.mock.resetCalls();
    });

    test('should create a new task successfully', async () => {
        const validTaskInput = {
            title: 'Native Node Test',
            status: 'To Do',
            dueDate: new Date().toISOString()
        };

        createMock.mock.mockImplementation(async () => ({
            _id: '123',
            ...validTaskInput
        }));

        const res = await request(app)
            .post('/api/tasks')
            .send(validTaskInput);

        assert.strictEqual(res.status, 201);
        assert.strictEqual(res.body.message, 'Task created successfully');
    });
});