import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';

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
}

export function ToDoList(props: ToDoListPropsType) {
    const addTask = (title: string) => props.addTask(title, props.todoListID)

    // const [title, setTitle] = useState<string>('')
    // const [error, setError] = useState<boolean>(false)

    // const addTask = () => {
    //     const trimedTitle = title.trim()
    //     if (trimedTitle) {
    //         props.addTask(trimedTitle,props.todoListID)
    //     } else {
    //         setError(true)
    //     }
    //     setTitle('')
    // }
    //
    // const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         addTask()
    //     }
    // }

    // const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    //     setError(false)
    // }

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

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        return (
            <li className={t.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
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

