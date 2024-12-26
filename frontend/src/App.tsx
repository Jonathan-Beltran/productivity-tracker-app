import React from 'react';
import './App.css'

const App: React.FC = () => {
    return (
        <div className="app">
            <Welcome />
        </div>
    )
};

function Welcome(){
    return(
        <div className="welcome">
            <h1>Welcome.</h1>
        </div>
    );
}



export default App;