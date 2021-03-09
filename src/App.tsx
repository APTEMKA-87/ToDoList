import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
        /*const todoListTasks = tasks[todoListID]
        const filteredTasks = todoListTasks.filter(t => t.id !== taskID) // true*/
        /*tasks[todoListID] = filteredTasks*/
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks})
        }
    }

    function changeToDoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newtodoList: ToDoListType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoLists([...todoLists, newtodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForToDoList = tasks[tl.id]

        if (tl.filter === 'active') {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
        }
        return (
            <ToDoList
                todoListID={tl.id}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                title={tl.title}
                tasks={tasksForToDoList}
                changeToDoListFilter={changeToDoListFilter}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })
    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    );
}

export default App;

