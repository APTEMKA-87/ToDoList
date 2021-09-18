import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

type ToDoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    function removeTask(id: string, toDoListId: string) {
        let tasks = tasksObj[toDoListId]
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[toDoListId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, toDoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[toDoListId]
        let newTasks = [task, ...tasks];
        tasksObj[toDoListId] = newTasks
        setTasksObj({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListId: string) {
        let tasks = tasksObj[toDoListId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    }

    function changeFilter(value: FilterValuesType, toDoListId: string) {
        let toDoList = toDoLists.find(tl => tl.id === toDoListId)
        if (toDoList) {
            toDoList.filter = value
            setToDoLists([...toDoLists])
        }
    }

    let toDoListId1 = v1()
    let toDoListId2 = v1()

    let [toDoLists, setToDoLists] = useState<ToDoListsType[]>([
        {id: toDoListId1, title: 'Learn', filter: 'all'},
        {id: toDoListId2, title: 'Buy', filter: 'all'}

    ])

    let removeToDoList = (toDoListId: string) => {
        let filteredToDoList = toDoLists.filter(tl => tl.id !== toDoListId)
        setToDoLists(filteredToDoList)
        delete tasksObj[toDoListId]
        setTasksObj(tasksObj)
    }

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [toDoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [toDoListId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
        ]
    })

    function AddToDoList(title: string) {
        let ToDoList: ToDoListsType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setToDoLists([ToDoList, ...toDoLists])
        setTasksObj({
            ...tasksObj,
            [ToDoList.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={AddToDoList}/>
            {
                toDoLists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeToDoList={removeToDoList}
                    />
                })
            }

        </div>
    );
}

export default App;
