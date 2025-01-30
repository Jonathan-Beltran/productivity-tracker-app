import express from 'express';
import {createDatabase, addGoal, deleteGoal} from '../database/index';
const app = express();
const cors = require('cors');
const port =  4000;
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.json());
app.options('*', cors());

app.post('/add-goal', (req, res) => {
    const { goal } = req.body;
    addGoal(goal, (err, newGoal) => {
        if (err) return res.status(500).send('failed to add goal');
        res.status(200).json(newGoal);
    });
});

app.delete('/delete-goal/:id', (req, res) => {
    const { id } = req.params;
    deleteGoal(parseInt(id));
    res.status(200).send('goal deleted');
});

app.listen(4000, () => console.log('backend running on port 4000'));