import express from 'express';
import {createDatabase, addGoal, deleteGoal, getGoals} from '../database/index';

createDatabase();

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

app.get('/get-goals', async(req, res) => {
    try {
        const goals = await getGoals();
        const activeGoals = goals.filter((goal) => !goal.deleted_at);
        res.status(200).json(activeGoals);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).send('Failed to fetch goals');
    }
});

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