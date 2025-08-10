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
            <h2> Create any goal, or select an existing one. <br></br>(ie. I want to learn how to cook.)</h2>
        </div>
    );
}




export default App;