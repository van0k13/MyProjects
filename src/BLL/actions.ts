import {ITask, Itodolist} from "./types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./store";

export const actionCreators = {
    setTodoList: (todolists: Array<Itodolist>) => ({ type: 'Todolist/reducer/SET_TODOLISTS' , todolists }as const),
    setTasks: (tasks: Array<ITask>, todolistId: string) => ({ type: 'Todolist/reducer/SET_TASKS', tasks, todolistId }as const),
    addTodoList: (newTodolist: Itodolist) => ({ type: "Todolist/reducer/ADD_TODOLIST", newTodolist }as const),
    addTask: (newTask: ITask, todolistId: string) => ({ type: "Todolist/reducer/ADD_TASK", newTask, todolistId }as const),
    changeTask: (taskId: string, obj: any, todolistId: string) => ({ type: "Todolist/reducer/CHANGE_TASK", taskId, obj, todolistId } as const),
    changeTodolist: (todolistId: string, title: string) => ({ type: "Todolist/reducer/CHANGE_TODOLIST", todolistId, title }as const),
    deleteTodoList: (todolistId: string) => ({ type: "Todolist/reducer/DELETE_TODOLIST", todolistId }as const),
    deleteItem: (taskId: string, todolistId: string) => ({ type: "Todolist/reducer/DELETE_TASK", taskId, todolistId }as const)
}

export type ThunkType = ThunkAction<void, RootState, unknown, ActionTypes>
type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
export type ActionTypes = InferActionTypes<typeof actionCreators>