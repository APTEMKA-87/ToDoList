import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const task1 = [
        {id:1, title:'HTML', isDone: true,},
        {id:2, title:'JS', isDone:true,},
        {id:3, title:'REACT', isDone:false,},
        {id:3, title:'Rest API', isDone:false,},
        {id:3, title:'GraphQL', isDone:false,},
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" task = {task1}/>
        </div>
    )
}

export default App;
