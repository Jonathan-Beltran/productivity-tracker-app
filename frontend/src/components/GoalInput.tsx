import { useState } from 'react';
import '../App.css';

const GoalInput = () => {
    const [goal, setGoal] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoal(event.target.value)
    }

    const saveGoal = async () => {
        try {  
            const response = await fetch('http://localhost:5000/add-goal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ goal })
            });

            if (!response.ok){
                throw new Error('Failed to save goal');
            }

            const newGoal = await response.json();
            console.log('Goal saved successfully', newGoal);
            setGoal('');
            //functionality for goal display here


        } catch (err: any) {
            console.error('Error adding goal (saveGoal func)', err.message);
        }
    }
   

    return(
        <div className = "goal-input">
            <input type = "text" value = {goal} onChange = {handleChange} placeholder = "Enter your goal here"></input>
            <button onClick = {saveGoal}>Save</button>
        </div>
    );
}
export default GoalInput;
