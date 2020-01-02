export const ADD_TODOLLIST = "Todolist/reducer/ADD_TODOLIST";
export const DELETE_TODOLIST = "Todolist/reducer/DELETE_TODOLIST";
export const ADD_TASK = "Todolist/reducer/ADD_TASK";
export const CHANGE_TASK = "Todolist/reducer/CHANGE_TASK";
export const DELETE_TASK = "Todolist/reducer/DELETE_TASK";

const initialState = {
    todolists: [
        {
            "id": 1, "title": "monday", tasks: [
                { "id": 0, "title": "07:00 get up", "isDone": false, "priority": "low" },
                { "id": 1, "title": "08:00 go to work", "isDone": false, "priority": "low" },
                { "id": 2, "title": "13:00 to eat", "isDone": false, "priority": "high" },
                { "id": 3, "title": "234", "isDone": false, "priority": "low" }
            ],
            "filterValue": "All"
        },
        {
            "id": 2, "title": "tuesday", tasks: [
                { "id": 0, "title": "07:00 get up", "isDone": false, "priority": "low" },
                { "id": 1, "title": "07:30 to have lanch", "isDone": false, "priority": "low" },
                { "id": 2, "title": "14:00 to sleep", "isDone": false, "priority": "low" },
                { "id": 3, "title": "jkh", "isDone": false, "priority": "low" }
            ],
            "filterValue": "All"
        },
        {
            "id": 3, "title": "wednesday", tasks: [
                { "id": 0, "title": "nothing to do", "isDone": false, "priority": "low" },
                { "id": 1, "title": "nothiung to see", "isDone": false, "priority": "low" },
                { "id": 2, "title": "eat me ", "isDone": false, "priority": "low" }
            ],
            "filterValue": "All"
        }
    ],
    nextTaskId: 4,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter( tl => {
                    return tl.id !== action.todolistId
                } )
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return { ...tl, tasks: [...tl.tasks, action.newTask] }
                    } else {
                        return tl
                    }
                })
            }
        case CHANGE_TASK:
            return {
                ...state, 
                todolists: state.todolists.map( (todo)=> {
                    if (todo.id === action.todolistId) {
                        return {
                            ...todo,
                            tasks: todo.tasks.map( (task)=> {
                                if (task.id === action.taskId) {
                                    return {...task, ...action.obj}
                                } else {
                                    return task
                                }
                            } )
                        }        
                    } else {
                        return todo
                    }
                } )
            }
        case DELETE_TASK: 
            return {
                ...state,
                todolists: state.todolists.map( tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl, 
                            tasks: tl.tasks.filter( task => {
                                return (task.id !== action.taskId)
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        default:
            return state;
    }
}

export const addTodoListAC = (newTodolist) => {
 return {   type: ADD_TODOLLIST, newTodolist}
};
export const addTaskAC = (newTask,todolistId) => {
 return {   type: ADD_TASK, newTask,todolistId}
};
export const changeTaskAC = (taskId, obj, todolistId) => {
 return {   type: CHANGE_TASK, taskId, obj, todolistId}
};
export const deleteTodoListAC = (todolistId) => {
 return {   type: DELETE_TODOLIST, todolistId}
};
export const deleteItemAC = (taskId, todolistId) => {
 return {   type: DELETE_TASK, taskId, todolistId}
};

export default reducer;