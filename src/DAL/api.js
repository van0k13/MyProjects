import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    withCredentials: true,
    headers: { "API-KEY": "d4a52b38-3f53-4696-96ef-92d8bbcea7be" }
})

export const api = {
    getTodolists() {
        return instance
            .get()
            .then(res => res.data)
    },
    addTodolist(title) {
        return instance
            .post("", { title })
            .then((res) => res.data)
    },
    deleteTodolist(TodoId) {
        return instance
            .delete(`${TodoId}`)
    },
    changeTodolist(todoId, title) {
        return instance
        .put(`${todoId}`, title)
    },
    getTasks(todoId) {
        return instance
            .get(`${todoId}/tasks`)
    },
    addTask(TodoId, newText) {
        return instance
            .post(`${TodoId}/tasks`, { title: newText })
            .then((res) => res.data)
    },
    deleteTask(TodoId, taskId) {
        return instance
            .delete(`${TodoId}/tasks/${taskId}`)
    },
    changeTask(TodoId, taskId, dataForServer) {
        return instance
            .put(`${TodoId}/tasks/${taskId}`, dataForServer)
    }
}