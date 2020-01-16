const ADD_TODOLLIST = "Todolist/reducer/ADD_TODOLIST";
const DELETE_TODOLIST = "Todolist/reducer/DELETE_TODOLIST";
const CHANGE_TODOLIST = "Todolist/reducer/CHANGE_TODOLIST";
const ADD_TASK = "Todolist/reducer/ADD_TASK";
const CHANGE_TASK = "Todolist/reducer/CHANGE_TASK";
const DELETE_TASK = "Todolist/reducer/DELETE_TASK";
const SET_TODOLISTS = 'SET_TODOLISTS';
const SET_TASKS = 'SET_TASKS';

const initialState = {
    todolists: [ ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOLISTS:
            let todoLists = action.todolists.map(tl => ({...tl, tasks: []}));
            return {
                ...state, todolists: todoLists
            }
        case ADD_TODOLLIST:
            let todolists = {
                ...action.newTodolist,
                tasks: []
            }
            return {
                ...state,
                todolists: [todolists, ...state.todolists],
                nextTaskId: +1
            }
        case CHANGE_TODOLIST:
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if(todo.id === action.id)  {
                        debugger
                        return {...todo, title: action.title}
                    } else { return todo}
                }) 
            }
        case SET_TASKS:
            return {
                ...state, 
                todolists: state.todolists.map(todo => {
                    if(todo.id === action.todolistId) {
                        return {...todo, tasks: action.tasks}
                    } return todo
                })
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


export const setTodoList = (todolists) => ({type: SET_TODOLISTS, todolists})
export const setTasks = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId})
export const addTodoList = (newTodolist) => ({type: ADD_TODOLLIST, newTodolist});
export const addTask = (newTask,todolistId) => ({type: ADD_TASK, newTask,todolistId});
export const changeTask = (taskId, obj, todolistId) => ({type: CHANGE_TASK, taskId, obj, todolistId});
export const changeTodolist = (todolistId, title) => ({type: CHANGE_TODOLIST, todolistId, title});
export const deleteTodoList = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
export const deleteItem = (taskId, todolistId) => ({type: DELETE_TASK, taskId, todolistId});

export default reducer;