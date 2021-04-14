import React, {useCallback} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListFilterActionTypeAC,
    ChangeTodoListTitleActionTypeAC,
    RemoveTodoListActionTypeAC
} from './state/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleStatusAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import AddItemForm from './AddItemForm';

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    },[])

    const addTask = useCallback((title: string, todoListID: string) => {
        let action = addTaskAC(title, todoListID)
        dispatch(action)
    }, [])

    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListID: string) => {
        let action = changeTaskStatusAC(taskID, newIsDoneValue, todoListID)
        dispatch(action)
    },[])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        let action = changeTaskTitleStatusAC(taskID, newTitle, todoListID)
        dispatch(action)
    },[])

    const changeToDoListFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        let action = ChangeTodoListFilterActionTypeAC(todoListID, newFilterValue)
        dispatch(action)
    },[])

    const changeToDoListTitle = useCallback((newTitle: string, todoListID: string) => {
        let action = ChangeTodoListTitleActionTypeAC(newTitle, todoListID)
        dispatch(action)
    },[])

    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodoListActionTypeAC(todoListID)
        dispatch(action)
    },[])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [])

    const todoListComponents = todoLists.map(tl => {
        let tasksForToDoList = tasks[tl.id]

        if (tl.filter === 'active') {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <ToDoList
                        todoListID={tl.id}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        title={tl.title}
                        tasks={tasksForToDoList}
                        changeTaskTitle={changeTaskTitle}
                        changeToDoListFilter={changeToDoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeToDoListTitle={changeToDoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px 0px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

