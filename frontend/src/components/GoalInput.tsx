import { useState } from 'react';
import '../App.css';

const GoalInput = () => {
    const [goal, setGoal] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoal(event.target.value)
    }
    const saveGoal = () => {
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
