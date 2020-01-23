import { api } from "../DAL/api";

const ADD_TODOLLIST = "Todolist/reducer/ADD_TODOLIST";
const DELETE_TODOLIST = "Todolist/reducer/DELETE_TODOLIST";
const CHANGE_TODOLIST = "Todolist/reducer/CHANGE_TODOLIST";
const ADD_TASK = "Todolist/reducer/ADD_TASK";
const CHANGE_TASK = "Todolist/reducer/CHANGE_TASK";
const DELETE_TASK = "Todolist/reducer/DELETE_TASK";
const SET_TODOLISTS = 'SET_TODOLISTS';
const SET_TASKS = 'SET_TASKS';

const initialState = {
    todolists: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOLISTS:
            let todoLists = action.todolists.map(tl => ({ ...tl, tasks: [] }));
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
                    if (todo.id === action.id) {
                        return { ...todo, title: action.title }
                    } else { return todo }
                })
            }
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id === action.todolistId) {
                        return { ...todo, tasks: action.tasks }
                    } return todo
                })
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => {
                    return tl.id !== action.todolistId
                })
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
                todolists: state.todolists.map((todo) => {
                    if (todo.id === action.todolistId) {
                        return {
                            ...todo,
                            tasks: todo.tasks.map((task) => {
                                if (task.id === action.taskId) {
                                    return { ...task, ...action.obj }
                                } else {
                                    return task
                                }
                            })
                        }
                    } else {
                        return todo
                    }
                })
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(task => {
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

const actionCreators = {
    setTodoList: (todolists) => ({ type: SET_TODOLISTS, todolists }),
    setTasks: (tasks, todolistId) => ({ type: SET_TASKS, tasks, todolistId }),
    addTodoList: (newTodolist) => ({ type: ADD_TODOLLIST, newTodolist }),
    addTask: (newTask, todolistId) => ({ type: ADD_TASK, newTask, todolistId }),
    changeTask: (taskId, obj, todolistId) => ({ type: CHANGE_TASK, taskId, obj, todolistId }),
    changeTodolist: (todolistId, title) => ({ type: CHANGE_TODOLIST, todolistId, title }),
    deleteTodoList: (todolistId) => ({ type: DELETE_TODOLIST, todolistId }),
    deleteItem: (taskId, todolistId) => ({ type: DELETE_TASK, taskId, todolistId })
}



export const thunkCreators = {
    loadTodolistsTC: () => {
        return (dispatch) => {
            api.getTodolists()
                .then(res => {
                    dispatch(actionCreators.setTodoList(res))
                });
        }
    },
    addTodolistTC: (title) => {
        return (dispatch) => {
            api.addTodolist(title)
                .then((res) => {
                    let todolist = res.data.item;
                    dispatch(actionCreators.addTodoList(todolist));
                })
        }
    },
    loadTasksTC: (todolistId) => {
        return (dispatch) => {
            api.getTasks(todolistId)
                .then((res) => {
                    let tasks = res.data.items;
                    dispatch(actionCreators.setTasks(tasks, todolistId));
                })
        }
    },
    addTaskTC: (todolistId, newText) => {
        return (dispatch) => {
            api.addTask(todolistId, newText)
                .then((res) => {
                    let newTask = res.data.item;
                    dispatch(actionCreators.addTask(newTask, todolistId));
                })
        }
    },
    changeTodolistTitleTC: (todolistId, title) => {
        return (dispatch) => {
            api.changeTodolist(todolistId, title)
                .then(res => {
                    dispatch(actionCreators.changeTodolist(todolistId, title));
                })
        }
    },
    changeTaskTC: (todolistId, taskId, obj) => {
        return (dispatch, getState) => {
            let task = getState()
            .todolists.find(tl => tl.id === todolistId)
            .tasks.find(t => t.id === taskId)
            let dataForServer = {
                title: task.title,
                description: task.description,
                completed: task.completed,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...obj
            };
            api.changeTask(todolistId, taskId, dataForServer)
                .then((res) => {
                    dispatch(actionCreators.changeTask(taskId, obj, todolistId))
                })
        }
    },
    deleteTodolistTC: (todolistId) => {
        return (dispatch) => {
            api.deleteTodolist(todolistId)
            .then(res => {
                dispatch(actionCreators.deleteTodoList(todolistId))
            });
        }
    },
    deleteTaskTC: (todolistId, taskId) => {
        return (dispatch) => {
            api.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(actionCreators.deleteItem(taskId, todolistId))
            });
        }
    }
}



export default reducer;