import React from 'react';
import styles from './TodoList.module.css';
import TodoListTasks from '../TodoListTasks';
import TodoListFooter from '../TodoListFooter';
import TodoListTitle from '../TodoListTitle/TodoListTitle';
import AddNewItemForm from '../AddNewItemForm';
import { connect } from 'react-redux';
import { addTask, changeTask, deleteTodoList, deleteItem, setTasks, changeTodolist } from '../../BLL/reducer';
import { api } from '../../DAL/api';

class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }
    componentDidUpdate() {
        this.saveState();
    }

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
        api.getTasks(this.props.id)
            .then((res) => {
                let tasks = res.data.items;
                this.props.setTasks(tasks, this.props.id);
            })
    }
    addItem = (newText) => {
        api.addTask(this.props.id, newText)
            .then((res) => {
                let newTask = res.data.item;
                this.props.addTask(newTask, this.props.id);
            })
    }
    deleteItem = (taskId) => {
        api.deleteTask(this.props.id, taskId)
            .then(res => {
                this.props.deleteItem(taskId, this.props.id)
            });

    }
    deleteTodolist = () => {
        api.deleteTodolist(this.props.id)
            .then(res => {
                this.props.deleteTodoList(this.props.id)
            });

    }
    changeTodolist = () => {

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
        api.changeTask(this.props.id, taskId, dataForServer)
            .then((res) => {
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
    changeTodolisTitle = (todoId, incomTitle) => {
        api.changeTodolist(todoId, {title: incomTitle})
            .then(res => {
                this.props.changeTodolist(todoId, {
                    title: incomTitle
                })
            })
    }
    changePriority = (taskId, incomPriority) => {
        this.changeTask(taskId, { priority: incomPriority })
    }

    render = () => {
        return (
            <div className={styles.todoList}>
                <TodoListTitle
                    changeTodolisTitle={this.changeTodolisTitle}
                    deleteTodolist={this.deleteTodolist}
                    id={this.props.id}
                    title={this.props.title} />
                <AddNewItemForm addItem={this.addItem} />
                <TodoListTasks key={this.props.tasks.id} changeStatus={this.changeStatus}
                    deleteItem={this.deleteItem}
                    changePriority={this.changePriority}
                    changeTitle={this.changeTitle}
                    tasks={this.props.tasks.filter(t => {
                        switch (this.state.filterValue) {
                            case 'All':
                                return t;
                            case 'Completed':
                                return t.status;
                            case 'Active':
                                return !t.status;
                            default:
                                return t;
                        }
                    })} />
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
            </div>
        );
    }
}
const ConnectedTodoList = connect(null, { deleteItem, deleteTodoList, changeTask, addTask, setTasks, changeTodolist })(TodoList);
export default ConnectedTodoList;

