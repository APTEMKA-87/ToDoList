import {FilterValuesType, TasksStateType, TodolistType} from '../App';
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
    id: string
    isDone: boolean
    todolistId: string
}


type ActionsType = removeTaskACType | addTaskACType | changeTaskStatusACType

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
        case 'CHANGE_TASK_STATUS':

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

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): changeTaskStatusACType => {
    return {type: 'CHANGE_TASK_STATUS', id, isDone, todolistId}
}