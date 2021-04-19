import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

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

export const ToDoList = React.memo((props: ToDoListPropsType) => {

    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.todoListID, props.addTask])

    const removeTodoList = () => props.removeTodoList(props.todoListID)

    const setAllFilter = useCallback(() => {
        props.changeToDoListFilter('all', props.todoListID)
    }, [props.todoListID])

    const setActiveFilter = useCallback(() => {
        props.changeToDoListFilter('active', props.todoListID)
    }, [props.todoListID])

    const setCompletedFilter = useCallback(() => {
        props.changeToDoListFilter('completed', props.todoListID)
    }, [props.todoListID])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeToDoListTitle(title, props.todoListID)
    }, [props.changeToDoListTitle, props.todoListID])

    const removeTask = useCallback((taskId: string) =>{
        props.removeTask(taskId, props.todoListID)},[props.removeTask, props.todoListID])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) =>{
        props.changeTaskStatus(taskId, isDone, props.todoListID)},[props.changeTaskStatus, props.todoListID])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string) =>{
        props.changeTaskTitle(taskId, newTitle, props.todoListID)},[ props.changeTaskTitle, props.todoListID])

    const tasks = props.tasks.map(t => {

        return <Task
            key={t.id}
            task={t}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
        />
    })

    let tasksForToDoList = props.tasks

    if (props.filter === 'active') {
        tasksForToDoList = props.tasks.filter(t => t.isDone === false)
    }

    if (props.filter === 'completed') {
        tasksForToDoList = props.tasks.filter(t => t.isDone === true)
    }

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
})

