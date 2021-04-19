import React, {useReducer} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListFilterActionTypeAC,
    ChangeTodoListTitleActionTypeAC,
    RemoveTodoListActionTypeAC,
    todoListReducer
} from './state/todolist-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleStatusAC,
    removeTaskAC,
    tasksReducer
} from './state/tasks-reducer';

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

function AppWithReducers() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
        ],
    })

    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatchTasks(action)
    }

    function addTask(title: string, todoListID: string) {
        let action = addTaskAC(title, todoListID)
        dispatchTasks(action)
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        let action = changeTaskStatusAC(taskID, newIsDoneValue, todoListID)
        dispatchTasks(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action = changeTaskTitleStatusAC(taskID, newTitle, todoListID)
        dispatchTasks(action)
    }

    function changeToDoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        let action = ChangeTodoListFilterActionTypeAC(todoListID, newFilterValue)
        dispatchTodoLists(action)
    }

    function changeToDoListTitle(newTitle: string, todoListID: string) {
        let action = ChangeTodoListTitleActionTypeAC(newTitle, todoListID)
        dispatchTodoLists(action)
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListActionTypeAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const todoListComponents = todoLists.map(tl => {
        let allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        if (tl.filter === "active") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
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
                        tasks={tasksForTodolist}
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

export default AppWithReducers;

