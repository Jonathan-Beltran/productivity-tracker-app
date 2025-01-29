import React from "react";
import {useState} from 'react';

type Goal = {
    id: number;
    goal: string;
    created_at: string;
}

type GoalListProps = {
    goals: Goal[];
    deleteGoal: (id: number) => void;
};

const GoalList: React.FC<GoalListProps> = ({ goals, deleteGoal }) => {
    return (
        <div>
            <ul>
                {goals.map((goal) => 
                    <li key={goal.id}>{goal.id} - {goal.goal}{' '} <button onClick={() => deleteGoal(goal.id)}>delete</button></li>)
                }
            </ul>
        </div>
    );
}

export default GoalList;