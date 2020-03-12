import axios from 'axios'
import {IDataForServer} from '../BLL/types'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    withCredentials: true,
    headers: { "API-KEY": "d4a52b38-3f53-4696-96ef-92d8bbcea7be" }
})


export const api = {
    async getTodolists() {
        const res = await instance
            .get('')
        return res.data
    },
    async addTodolist(title: string) {
        const res = await instance
            .post("", { title })
        return res.data
    },
    deleteTodolist(TodoId: string) {
        return instance
            .delete(`${TodoId}`)
    },
    changeTodolist(todoId: string, title: string) {
        return instance
        .put(`${todoId}`, title)
    },
    getTasks(todoId: string) {
        return instance
            .get(`${todoId}/tasks`)
    },
    async addTask(TodoId: string, newText: string) {
        const res = await instance
            .post(`${TodoId}/tasks`, { title: newText })
        return res.data
    },
    deleteTask(TodoId: string, taskId: string) {
        return instance
            .delete(`${TodoId}/tasks/${taskId}`)
    },
    changeTask(TodoId: string, taskId: string, dataForServer: IDataForServer) {
        return instance
            .put(`${TodoId}/tasks/${taskId}`, dataForServer)
    }
}