import {TaskStateType, TaskType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from './todolist-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS-TASK'
    taskId: string
    isDone: boolean
    todolistId: string
}
type ChangeTaskStatusTitleActionType = {
    type: 'CHANGE-TITLE-TASK'
    taskId: string
    newTitle: string
    todolistId: string
}

const initialState:TaskStateType = {}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskStatusTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(task => {
                        if (task.id === action.taskId) {
                            return {...task, isDone: action.isDone}
                        } else {
                            return task
                        }
                    })
            }
        }
        case 'CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.newTitle}
                    } else {
                        return task
                    }
                })
            }
        }
        case 'ADD-TODOLIST':
            let todolistId = action.todolistId
            return {...state, [todolistId]: []}
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS-TASK', taskId, isDone, todolistId}
}
export const changeTaskTitleStatusAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskStatusTitleActionType => {
    return {type: 'CHANGE-TITLE-TASK', taskId, newTitle, todolistId}
}



