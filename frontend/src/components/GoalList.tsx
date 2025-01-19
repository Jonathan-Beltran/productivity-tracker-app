import React from "react";
import {useState} from 'react';

type Goal = {
    id: number;
    goal: string;
    created_at: string;
}

const DynamicList: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const addGoalToList = (goal: Goal) => {
        setGoals([...goals, goal]);
    }
    const handleDelete = async (id: number) => {
        try{
            const response = await fetch('http://localhost:5000/delete-goal/' + id, {
                method: 'DELETE',
            });
            if (!response.ok){
                throw new Error('Failed to delete goal (express)');
            }
        } catch (err: any){
            console.error('Error deleting goal', err.message);
        }
        const newGoals = goals.filter((goal) => goal.id !== id);
        setGoals(newGoals);
    }
    
    return (
        <div>
            <ul>
                {goals.map((goal, index) => (
                    <li key={index}>{goal.id} - {goal.goal} <button onClick={() => handleDelete(goals[index].id)}>delete</button></li>
                ))}
            </ul>
        </div>
    )
};
export default DynamicList;