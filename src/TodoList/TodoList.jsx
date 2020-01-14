import React from 'react';
import styles from './Todolist.module.css';
import TodoListTasks from '../TodoListTasks';
import TodoListFooter from '../TodoListFooter';
import TodoListTitle from '../TodoListTitle/TodoListTitle';
import AddNewItemForm from '../AddNewItemForm';
import { connect } from 'react-redux';
import { addTask, changeTask, deleteTodoList, deleteItem } from '../reducer';

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
        // объявляем наш стейт стартовый
        let state = this.state;
        // считываем сохранённую ранее строку из localStorage
        let stateAsString = localStorage.getItem('test-todolist' + this.props.id);
        // а вдруг ещё не было ни одного сохранения?? тогда будет null.
        // если не null, тогда превращаем строку в объект
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        // устанавливаем стейт (либо пустой, либо восстановленный) в стейт
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id + 1;
                }
            })
        });
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
        this.props.deleteTodoList(this.props.id)
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
const ConnectedTodoList = connect(null, {deleteItem,deleteTodoList,changeTask,addTask  })(TodoList);
export default ConnectedTodoList;

