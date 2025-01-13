import React from "react";
import {useState} from 'react';

const DynamicList: React.FC = () => {
    const [goals, setGoals] = useState<string[]>([]);
    const addGoalToList = (goal: { id: number; goal: string; created_at: string }) => {
        setGoals([...goals, goal.goal]);
    }
    // fucking i need to handle input. the function addGoalToList needs to take in
    // a newGoal. From the newGoal, i can get the goal, newGoal also holds
    // the sqlite id of the goal, so if it is deleted, i can use the id
    // to delete the goal from the database aswell. 
    
    return (
        <div>
            <ul>
                {goals.map((goal, index) => (
                    <li key={index}>{goal} <button onClick={() => handleDelete(index)}>delete</button></li>
                ))}
            </ul>
        </div>
    )
};
export default DynamicList;