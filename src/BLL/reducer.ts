import { api } from "../DAL/api";
import { Itodolist, ITask,IDataForServer} from "./types";
import {actionCreators, ActionTypes} from "./actions";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "./store";

const initialState = {
    todolists: [] as Array<Itodolist>,
    nextTaskId: 0
    
}
type InitialStateType = typeof initialState
const reducer = (state:InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'Todolist/reducer/SET_TODOLISTS':
            let todoLists = action.todolists.map((todo:Itodolist ) => ({ ...todo, tasks: [] }));
            return {
                ...state, todolists: todoLists
            }
        case "Todolist/reducer/ADD_TODOLIST":
            let todolists = {
                ...action.newTodolist,
                tasks: []
            }
            return {
                ...state,
                todolists: [todolists, ...state.todolists],
                nextTaskId: +1
            }
        case "Todolist/reducer/CHANGE_TODOLIST":
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id === action.todolistId) {
                        return { ...todo, title: action.title }
                    } else  return todo
                })
            }
        case 'Todolist/reducer/SET_TASKS':
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id === action.todolistId) {
                        return { ...todo, tasks: action.tasks }
                    } return todo
                })
            }
        case "Todolist/reducer/DELETE_TODOLIST":
            return {
                ...state,
                todolists: state.todolists.filter(tl => {
                    return tl.id !== action.todolistId
                })
            }
        case "Todolist/reducer/ADD_TASK":
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return { ...tl, tasks: [...tl.tasks, action.newTask] }
                    } else return tl
                })
            }
        case "Todolist/reducer/CHANGE_TASK":
            return {
                ...state,
                todolists: state.todolists.map((todo) => {
                    if (todo.id === action.todolistId) {
                        return {
                            ...todo,
                            tasks: todo.tasks.map((task) => {
                                if (task.id === action.taskId) {
                                    return { ...task, ...action.obj }
                                } else return task
                            })
                        }
                    } else return todo
                })
            }
        case "Todolist/reducer/DELETE_TASK":
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
                    } else return tl
                })
            }
        default:
            return state;
    }
}



export const thunkCreators = {
    loadTodolistsTC: () => {
        return (dispatch: ThunkDispatch<RootState, unknown, ActionTypes>) => {
            api.getTodolists()
                .then((res: any) => {
                    dispatch(actionCreators.setTodoList(res))
                });
        }
    },
    addTodolistTC: (title: string) => {
        return (dispatch: ThunkDispatch<RootState, unknown, ActionTypes>) => {
            api.addTodolist(title)
                .then((res) => {
                    let todolist = res.data.item;
                    dispatch(actionCreators.addTodoList(todolist));
                })
        }
    },
    loadTasksTC: (todolistId: string) => {
        return (dispatch: ThunkDispatch<RootState, unknown, ActionTypes>) => {
            api.getTasks(todolistId)
                .then((res) => {
                    let tasks = res.data.items;
                    dispatch(actionCreators.setTasks(tasks, todolistId));
                })
        }
    },
    addTaskTC: (todolistId: string, newText: string) => {
        return (dispatch: ThunkDispatch<RootState, unknown, ActionTypes>) => {
            api.addTask(todolistId, newText)
                .then((res) => {
                    let newTask = res.data.item;
                    dispatch(actionCreators.addTask(newTask, todolistId));
                })
        }
    },
    changeTodolistTitleTC: (todolistId: string, title: string) => {
        return (dispatch: ThunkDispatch<RootState, unknown, ActionTypes>) => {
            api.changeTodolist(todolistId, title)
                .then(_=>dispatch(actionCreators.changeTodolist(todolistId, title)))
        }
    },
    changeTaskTC: (todolistId: string, taskId: string, obj: IDataForServer) => {
        return (dispatch: ThunkDispatch<RootState, unknown, ActionTypes>, getState: ()=>any) => {
            let task: ITask = getState()
                .mainReducer
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
                .then(_=>dispatch(actionCreators.changeTask(taskId, obj, todolistId)))
        }
    },
    deleteTodolistTC: (todolistId: string) => {
        return (dispatch: ThunkDispatch<RootState, unknown, ActionTypes>) => {
            api.deleteTodolist(todolistId)
                .then(_=>dispatch(actionCreators.deleteTodoList(todolistId)));
        }
    },
    deleteTaskTC: (todolistId: string, taskId: string) => {
        return (dispatch: ThunkDispatch<RootState, unknown, ActionTypes>) => {
            api.deleteTask(todolistId, taskId)
                .then(_=>dispatch(actionCreators.deleteItem(taskId, todolistId)));
        }
    }
}



export default reducer;