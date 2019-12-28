import React from 'react';
import styles from './Todolist.module.css';
import TodoListTasks from '../TodoListTasks';
import TodoListFooter from '../TodoListFooter';
import TodoListTitle from '../TodoListTitle/TodoListTitle';
import AddNewItemForm from '../AddNewItemForm';
import { connect } from 'react-redux';

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
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem('test-todolist' + this.props.id);
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.tasks.map(t => {
                if (t.id >= this.nextTaskId) {
                    return this.nextTaskId++;
                }
            })
        })
    }

    addItem = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: 'low'
        };
        this.props.addTask(newTask, this.props.id)
        this.nextTaskId++;
    }
    deleteItem = (taskId) => {
        this.props.deleteItem(taskId, this.props.id)
    }
    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }

    changeTask = (taskId, obj) => {
        this.props.changeTask(taskId, obj, this.props.id)
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, { isDone: isDone })
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

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId) {
            const action = {
                type: "ADD_TASK", newTask, todolistId
            };
            dispatch(action)
        },
        changeTask(taskId, obj, todolistId) {
            const action = {
                type: "CHANGE_TASK", taskId, obj, todolistId
            }
            dispatch(action)
        },
        deleteTodolist: (todolistId) => {
            const action = {
                type: 'DELETE_TODOLIST',
                todolistId
            }
            dispatch(action)
        },
        deleteItem: (taskId, todolistId) => {
            const action = {
                type: 'DELETE_TASK', taskId, todolistId
            }
            dispatch(action)
        }
    }
}
const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;

