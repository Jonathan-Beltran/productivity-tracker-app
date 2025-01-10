import { useState } from 'react';
import { addGoal } from '../../../backend/dist/database';
import '../App.css';

const GoalInput = () => {
    const [goal, setGoal] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoal(event.target.value)
    }
    const saveGoal = () => {
        addGoal(goal, (err, newGoal) => {
            if(err){
                console.error('Error adding goal', err.message);
            } else {
                console.log('Goal added successfully', newGoal);
                setGoal('');
                // functionality here to display the newly added goal on the screen
            }
        });
        console.log(goal);
    }

    return(
        <div className = "goal-input">
            <input type = "text" value = {goal} onChange = {handleChange} placeholder = "Enter your goal here"></input>
            <button onClick = {saveGoal}>Save</button>
        </div>
    );
}
export default GoalInput;
