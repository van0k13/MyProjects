import { createStore } from "redux";

const initialState = {
    todolists: [
        {
            "id": 1, "title": "monday", tasks: [
                { "id": 0, "title": "07:00 get up", "isDone": false, "priority": "low" },
                { "id": 1, "title": "08:00 go to work", "isDone": false, "priority": "low" },
                { "id": 2, "title": "13:00 to eat", "isDone": false, "priority": "high" },
                { "id": 3, "title": "234", "isDone": false, "priority": "low" }
            ],
            "filterValue": "All"
        },
        {
            "id": 2, "title": "tuesday", tasks: [
                { "id": 0, "title": "07:00 get up", "isDone": false, "priority": "low" },
                { "id": 1, "title": "07:30 to have lanch", "isDone": false, "priority": "low" },
                { "id": 2, "title": "14:00 to sleep", "isDone": false, "priority": "low" },
                { "id": 3, "title": "jkh", "isDone": false, "priority": "low" }
            ],
            "filterValue": "All"
        },
        {
            "id": 3, "title": "wednesday", tasks: [
                { "id": 0, "title": "nothing to do", "isDone": false, "priority": "low" },
                { "id": 1, "title": "nothiung to see", "isDone": false, "priority": "low" },
                { "id": 2, "title": "eat me ", "isDone": false, "priority": "low" }
            ],
            "filterValue": "All"
        }
    ],
    nextTaskId: 4,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODOLIST":
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case "ADD_TASK":
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
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;