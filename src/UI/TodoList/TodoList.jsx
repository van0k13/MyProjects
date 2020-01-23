import React from 'react';
import styles from './TodoList.module.css';
import TodoListTasks from '../TodoListTasks';
import TodoListFooter from '../TodoListFooter';
import TodoListTitle from '../TodoListTitle/TodoListTitle';
import AddNewItemForm from '../AddNewItemForm';
import { connect } from 'react-redux';
import { thunkCreators } from '../../BLL/reducer';

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
        this.props.loadTasks(this.props.id)
    }
    addItem = (newText) => {
        this.props.addTask(this.props.id, newText)

    }
    deleteItem = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    }
    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }
    changeTask = (taskId, obj) => {
        this.props.changeTask(this.props.id, taskId, obj)
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
        this.props.changeTodolistTitle(todoId, incomTitle)
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
const mapDispatchToProps = (dispatch) => {
    return {
        loadTasks: (todolistId) => {
            let thunk = thunkCreators.loadTasksTC(todolistId);
            dispatch(thunk)
        },
        addTask: (todolistId, newText) => {
            let thunk = thunkCreators.addTaskTC(todolistId, newText);
            dispatch(thunk)
        },
        changeTodolistTitle: (todolistId, title) => {
            let thunk = thunkCreators.changeTodolistTitleTC(todolistId, title);
            dispatch(thunk)
        },
        changeTask: (todolistId, taskId, obj) => {
            let thunk = thunkCreators.changeTaskTC(todolistId, taskId, obj);
            dispatch(thunk)
        },
        deleteTodolist: (todolistId) => {
            dispatch(thunkCreators.deleteTodolistTC(todolistId))
        },
        deleteTask: (todolistId, taskId) => {
            dispatch(thunkCreators.deleteTaskTC(todolistId, taskId))
        }
    }
}
const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;