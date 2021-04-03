import {TaskStateType, ToDoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, todoListReducer} from "./todolist-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};

    const startTodolistsState: Array<ToDoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
