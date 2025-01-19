import express from 'express';
import {createDatabase, addGoal, deleteGoal} from '../database/index';
const app = express();
const port =  5000;

app.use(express.json());

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

app.listen(5000, () => console.log('backend running on port 5000'));