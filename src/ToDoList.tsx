import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type ToDoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeToDoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeToDoListTitle: (newTitle:string, todoListID: string) => void
}

export function ToDoList(props: ToDoListPropsType) {
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const setAllFilter = () => {
        props.changeToDoListFilter('all', props.todoListID)
    }
    const setActiveFilter = () => {
        props.changeToDoListFilter('active', props.todoListID)
    }
    const setCompletedFilter = () => {
        props.changeToDoListFilter('completed', props.todoListID)
    }
    const changeTodoListTitle = (title: string) => props.changeToDoListTitle(title, props.todoListID)

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        return (
            <li className={t.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''}
                        onClick={setAllFilter}>All
                </button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={setActiveFilter}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active' : ''}
                        onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

