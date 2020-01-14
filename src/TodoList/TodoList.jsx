import React from 'react';
import styles from './Todolist.module.css';
import TodoListTasks from '../TodoListTasks';
import TodoListFooter from '../TodoListFooter';
import TodoListTitle from '../TodoListTitle/TodoListTitle';
import AddNewItemForm from '../AddNewItemForm';
import { connect } from 'react-redux';
import axios from 'axios'
import { addTask, changeTask, deleteTodoList, deleteItem, setTasks } from '../reducer';

class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }
    componentDidUpdate() {
        this.saveState();
    }

    newTaskTitleRef = React.createRef();

    state = {
        tasks: [],
        filterValue: 'All'
    }

    nextTaskId = 0;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('test-todolist' + this.props.id, stateAsString);
    }

    restoreState = () => {
        axios
            .get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
                {
                    withCredentials: true,
                    headers: {
                        "API-KEY": "d4a52b38-3f53-4696-96ef-92d8bbcea7be" //взяли на сайте камасутры (сгенерирован автоматом)
                    }
                })
            .then((res) => {
                let tasks = res.data.items;
                this.props.setTasks(tasks, this.props.id);
            })
    }

    addItem = (newText) => {
        axios
            .post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
                { title: newText },
                {
                    withCredentials: true,
                    headers: {
                        "API-KEY": "d4a52b38-3f53-4696-96ef-92d8bbcea7be" //взяли на сайте камасутры (сгенерирован автоматом)
                    }
                })
            .then((res) => {
                let newTask = res.data.data.item;
                this.props.addTask(newTask, this.props.id);
            })

    }
    deleteItem = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {
                    "API-KEY": "d4a52b38-3f53-4696-96ef-92d8bbcea7be"
                }
            })
            .then(res => {
                this.props.deleteItem(taskId, this.props.id)
            });

    }
    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {
                    "API-KEY": "d4a52b38-3f53-4696-96ef-92d8bbcea7be"
                }
            })
            .then(res => {
                this.props.deleteTodoList(this.props.id)
            });

    }

    changeTask = (taskId, obj) => {
        let task = this.props.tasks.find(t => t.id === taskId)
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
        axios
            .put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
                dataForServer,
                {
                    withCredentials: true,
                    headers: {
                        "API-KEY": "d4a52b38-3f53-4696-96ef-92d8bbcea7be" //взяли на сайте камасутры (сгенерирован автоматом)
                    }
                })
            .then((res) => {
                //  let newTask = res.data.data.item;
                this.props.changeTask(taskId, obj, this.props.id)
            })

    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, { status: isDone })
    }
    changeTitle = (taskId, incomTitle) => {
        this.changeTask(taskId, { title: incomTitle })
    }
    changePriority = (taskId, incomPriority) => {
        this.changeTask(taskId, { priority: incomPriority })
    }

    render = () => {
        return (
            <div className={styles.todoList}>
                <TodoListTitle deleteTodolist={this.deleteTodolist} title={this.props.title} />
                <AddNewItemForm addItem={this.addItem} />
                <TodoListTasks changeStatus={this.changeStatus}
                    deleteItem={this.deleteItem}
                    changePriority={this.changePriority}
                    changeTitle={this.changeTitle}
                    tasks={this.props.tasks.filter(t => {
                        switch (this.state.filterValue) {
                            case 'All':
                                return t;
                            case 'Completed':
                                return t.isDone;
                            case 'Active':
                                return !t.isDone;
                            default:
                                return t;
                        }
                    })} />
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
            </div>
        );
    }
}
const ConnectedTodoList = connect(null, { deleteItem, deleteTodoList, changeTask, addTask, setTasks })(TodoList);
export default ConnectedTodoList;

