
export const ADD_TODOLLIST = "Todolist/reducer/ADD_TODOLIST";
export const DELETE_TODOLIST = "Todolist/reducer/DELETE_TODOLIST";
export const CHANGE_TODOLIST = "Todolist/reducer/CHANGE_TODOLIST";
export const ADD_TASK = "Todolist/reducer/ADD_TASK";
export const CHANGE_TASK = "Todolist/reducer/CHANGE_TASK";
export const DELETE_TASK = "Todolist/reducer/DELETE_TASK";
export const SET_TODOLISTS = 'SET_TODOLISTS';
export const SET_TASKS = 'SET_TASKS';


export type TodolistActionTypes = SET_TODOLISTS| ADD_TODOLLIST | DELETE_TODOLIST | CHANGE_TODOLIST | ADD_TASK |
    CHANGE_TASK | DELETE_TASK | SET_TASKS ;

interface ADD_TODOLLIST {
    newTodolist: Itodolist;
    type: typeof ADD_TODOLLIST
}
interface DELETE_TODOLIST {
    todolistId: string;
    type: typeof DELETE_TODOLIST
}
interface CHANGE_TODOLIST {
    id: string;
    title: string;
    type: typeof CHANGE_TODOLIST
}
interface ADD_TASK {
    todolistId: string;
    newTask: ITask;
    type: typeof ADD_TASK
}
interface CHANGE_TASK {
    todolistId: string;
    taskId: string;
    obj: any;
    type: typeof CHANGE_TASK
}
interface DELETE_TASK {
    todolistId: string;
    taskId: string;
    type: typeof DELETE_TASK
}
interface SET_TASKS {
    todolistId: string;
    tasks: Array<ITask>;
    type: typeof SET_TASKS
}
interface SET_TODOLISTS {
    type: typeof SET_TODOLISTS,
    todolists: Itodolist
}

export interface ITask {
    map: any;
    id: string,
    title: string,
    priority: number,
    status: number,
    key?:string,
    checked: any
}
export interface Itodolist {
    map: any;
    id: string,
    title: string,
    tasks: Array<ITask>
}
export interface IState {
    todolists: Array<Itodolist>,
    nextTaskId?: number
}
export interface IDataForServer {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate?: string
    deadline?: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export interface AxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
  }
  export interface AxiosPromise<T> extends Promise<AxiosResponse<T>> {
}