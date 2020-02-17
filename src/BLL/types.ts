
export const ADD_TODOLLIST = "Todolist/reducer/ADD_TODOLIST";
export const DELETE_TODOLIST = "Todolist/reducer/DELETE_TODOLIST";
export const CHANGE_TODOLIST = "Todolist/reducer/CHANGE_TODOLIST";
export const ADD_TASK = "Todolist/reducer/ADD_TASK";
export const CHANGE_TASK = "Todolist/reducer/CHANGE_TASK";
export const DELETE_TASK = "Todolist/reducer/DELETE_TASK";
export const SET_TODOLISTS = 'SET_TODOLISTS';
export const SET_TASKS = 'SET_TASKS';


export type TodolistActionTypes = setTodolistsActionType | addTodolistActionType |
    deleteTodolistActionType | changeTodolistActionType | addTaskActionType |
    changeTaskActionType | deleteTaskActionType | setTaskActionType;

export interface addTodolistActionType {
    newTodolist: Itodolist;
    type: typeof ADD_TODOLLIST
}
export interface deleteTodolistActionType {
    todolistId: string;
    type: typeof DELETE_TODOLIST
}
export interface changeTodolistActionType {
    todolistId: string;
    title: string;
    type: typeof CHANGE_TODOLIST
}
export interface addTaskActionType {
    todolistId: string;
    newTask: ITask;
    type: typeof ADD_TASK
}
export interface changeTaskActionType {
    todolistId: string;
    taskId: string;
    obj: any;
    type: typeof CHANGE_TASK
}
export interface deleteTaskActionType {
    todolistId: string;
    taskId: string;
    type: typeof DELETE_TASK
}
export interface setTaskActionType {
    todolistId: string;
    tasks: Array<ITask>;
    type: typeof SET_TASKS
}
export interface setTodolistsActionType {
    type: typeof SET_TODOLISTS,
    todolists: Array<Itodolist>
}

export interface ITask {
    map: any;
    id: string,
    title: string,
    priority: number,
    status: number,
    key?: string,
    checked: any,
    description: string,
    completed: boolean,
    startDate?: string,
    deadline?: string
}
export interface Itodolist {
    map: any;
    id: string,
    title: string,
    tasks: Array<ITask>
}
export interface IState {
    mainReducer: any
}
export interface IMainReducer {
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