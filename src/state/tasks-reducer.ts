import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type removeTaskACType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}
export type addTaskACType = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}

export type changeTaskStatusACType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type changeTaskTitleACType = {
    type: 'CHANGE_TITLE'
    title: string
    taskId: string
    todolistId: string
}


type ActionsType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filterdTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filterdTasks
            return stateCopy
        }
        case 'ADD_TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE_TASK_STATUS': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE_TITLE':{
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskACType => {
    return {type: 'REMOVE_TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskACType => {
    return {type: 'ADD_TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusACType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleACType => {
    return {type: 'CHANGE_TITLE', taskId, title, todolistId}
}