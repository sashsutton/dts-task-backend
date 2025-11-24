import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {connectDB} from './utils/db.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', taskRoutes);

app.get('/', (req, res) => {
    res.send('Task Management API is running.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
})
