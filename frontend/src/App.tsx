import React from 'react';
import './App.css'
import GoalManager from './components/GoalManager';

const App: React.FC = () => {
    return (
        <div className="app">
            <Welcome />
            <GoalPrompt />
            <GoalManager/>
        </div>
    )
};

function Welcome(){
    return(
        <div className="welcome">
            <h1>Welcome. Let's lock in.</h1>
        </div>
    );
}

function GoalPrompt(){
    return(
        <div className="goal-prompt">
            <h2>Enter your current goal. <br></br>(ie. I want to learn how to cook, I want to master discrete structures, I want to be rich.)</h2>
        </div>
    );
}




export default App;