export interface ITask {
    map: any;
    id: string,
    title: string,
    priority: number,
    status: number,
    key: string,
    checked: any,
    description: string,
    completed: boolean,
    startDate: string,
    deadline: string
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
