import {useState} from 'react';
import GoalInput from './GoalInput';
import GoalList from './GoalList';
import { useEffect } from 'react';

type Goal = {
    id: number;
    goal: string;
    created_at: string;
};

const GoalManager = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    // on app render, this is supposed to fetch saved goals and display them
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await fetch('http://localhost:4000/get-goals');
                if (!response.ok) {
                    throw new Error('Failed to fetch goals');
                }
                const savedGoals = await response.json();
                setGoals(savedGoals);
                console.log('Successfully loaded saved goals:', savedGoals);
            } catch (error) {
                console.error('Failed to load saved goals:', error);
            }
        };
        fetchGoals();
    }, []);

    const addGoal = (newGoal: Goal) =>{
        setGoals([...goals, newGoal]);
        // do i need to add more here? what about the backend? thought it was handled but it isnt
    }

    const deleteGoal = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:4000/delete-goal/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete goal');
            }
            setGoals(goals.filter((goal) => goal.id !== id));
            console.log('Successfully deleted goal:', id);
        } catch (err){
            console.error('Failed to delete goal:', err);
        }
    };

    return(
        <div>
            <GoalInput addGoal={addGoal}/>
            <GoalList goals={goals} deleteGoal={deleteGoal}/>
        </div>
    );
};
export default GoalManager;