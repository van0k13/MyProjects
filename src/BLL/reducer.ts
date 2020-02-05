import { api } from "../DAL/api";
import { IState, Itodolist, ITask, TodolistActionTypes, SET_TODOLISTS,
    ADD_TODOLLIST, CHANGE_TODOLIST, SET_TASKS, DELETE_TODOLIST, ADD_TASK,
    CHANGE_TASK, DELETE_TASK, IMainReducer} from "./types";


   
const initialState: IMainReducer = {
    todolists: [],
    
}

const reducer = (state = initialState, action: TodolistActionTypes): IMainReducer => {
    switch (action.type) {
        case SET_TODOLISTS:
            let todoLists = action.todolists.map((todo:Itodolist ) => ({ ...todo, tasks: [] }));
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
    setTodoList: (todolists: IState) => ({ type: SET_TODOLISTS, todolists }),
    setTasks: (tasks: Array<ITask>, todolistId: string) => ({ type: SET_TASKS, tasks, todolistId }),
    addTodoList: (newTodolist: Itodolist) => ({ type: ADD_TODOLLIST, newTodolist }),
    addTask: (newTask: ITask, todolistId: string) => ({ type: ADD_TASK, newTask, todolistId }),
    changeTask: (taskId: string, obj: any, todolistId: string) => ({ type: CHANGE_TASK, taskId, obj, todolistId }),
    changeTodolist: (todolistId: string, title: string) => ({ type: CHANGE_TODOLIST, todolistId, title }),
    deleteTodoList: (todolistId: string) => ({ type: DELETE_TODOLIST, todolistId }),
    deleteItem: (taskId: string, todolistId: string) => ({ type: DELETE_TASK, taskId, todolistId })
}

export const thunkCreators = {
    loadTodolistsTC: () => {
        return (dispatch: Function) => {
            api.getTodolists()
                .then((res: any) => {
                    dispatch(actionCreators.setTodoList(res))
                });
        }
    },
    addTodolistTC: (title: string) => {
        return (dispatch: Function) => {
            api.addTodolist(title)
                .then((res) => {
                    let todolist = res.data.item;
                    dispatch(actionCreators.addTodoList(todolist));
                })
        }
    },
    loadTasksTC: (todolistId: string) => {
        return (dispatch: Function) => {
            api.getTasks(todolistId)
                .then((res) => {
                    let tasks = res.data.items;
                    dispatch(actionCreators.setTasks(tasks, todolistId));
                })
        }
    },
    addTaskTC: (todolistId: string, newText: string) => {
        return (dispatch: Function) => {
            api.addTask(todolistId, newText)
                .then((res) => {
                    let newTask = res.data.item;
                    dispatch(actionCreators.addTask(newTask, todolistId));
                })
        }
    },
    changeTodolistTitleTC: (todolistId: string, title: string) => {
        return (dispatch: Function) => {
            api.changeTodolist(todolistId, title)
                .then(res => {
                    dispatch(actionCreators.changeTodolist(todolistId, title));
                })
        }
    },
    changeTaskTC: (todolistId: string, taskId: string, obj: any) => {
        return (dispatch: Function, getState: any) => {
            let task = getState()
                .todolists.find((tl: Itodolist) => tl.id === todolistId)
                .tasks.find((t: ITask) => t.id === taskId)
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
    deleteTodolistTC: (todolistId: string) => {
        return (dispatch: Function) => {
            api.deleteTodolist(todolistId)
                .then(res => {
                    dispatch(actionCreators.deleteTodoList(todolistId))
                });
        }
    },
    deleteTaskTC: (todolistId: string, taskId: string) => {
        return (dispatch: Function) => {
            api.deleteTask(todolistId, taskId)
                .then(res => {
                    dispatch(actionCreators.deleteItem(taskId, todolistId))
                });
        }
    }
}



export default reducer;