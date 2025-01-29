import {useState} from 'react';
import GoalInput from './GoalInput';
import GoalList from './GoalList';

type Goal = {
    id: number;
    goal: string;
    created_at: string;
};

const GoalManager = () => {
    const [goals, setGoals] = useState<Goal[]>([]);

    const addGoal = (newGoal: Goal) =>{
        setGoals([...goals, newGoal]);
    }

    const deleteGoal = (id: number) => {
        setGoals(goals.filter((goal) => goal.id !== id));
    };

    return(
        <div>
            <GoalInput addGoal={addGoal}/>
            <GoalList goals={goals} deleteGoal={deleteGoal}/>
        </div>
    );
};
export default GoalManager;