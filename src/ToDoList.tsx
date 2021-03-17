import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
    changeToDoListTitle: (newTitle: string, todoListID: string) => void
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
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                    color={'secondary'}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={'contained'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    size={'small'}
                    onClick={setAllFilter}>All
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    size={'small'}
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    size={'small'}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

