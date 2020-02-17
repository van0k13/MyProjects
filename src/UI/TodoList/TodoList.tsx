import React from 'react';
import styles from './TodoList.module.css';
import TodoListTasks from '../TodoListTasks';
import TodoListFooter from '../TodoListFooter';
import TodoListTitle from '../TodoListTitle/TodoListTitle';
import AddNewItemForm from '../AddNewItemForm';
import { connect } from 'react-redux';
import { thunkCreators } from '../../BLL/reducer';
import { ITask } from '../../BLL/types';

interface IProps {
    id: string,
    title: string,
    tasks: Array<ITask>

}
interface IMapDispatchToProps {
    loadTasks: Function,
    addTask: Function,
    deleteTask: Function,
    deleteTodolist: Function,
    changeTask: Function,
    changeTodolistTitle: Function

}
interface IState {
    tasks: Array<ITask>,
    filterValue: string

}

class TodoList extends React.Component<IProps & IMapDispatchToProps>  {

    componentDidMount() {
        this.restoreState();
    }
    componentDidUpdate() {
        this.saveState();
    }

    state: IState = {
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
    addItem = (newText: string) => {
        this.props.addTask(this.props.id, newText)

    }
    deleteItem = (taskId: string) => {
        this.props.deleteTask(this.props.id, taskId)
    }
    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }
    changeTask = (taskId: string, obj: any) => {
        this.props.changeTask(this.props.id, taskId, obj)
    }
    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        });
    }
    changeStatus = (taskId: string, status: boolean) => {
        this.changeTask(taskId, { status })
    }
    changeTitle = (taskId: string, incomTitle: string) => {
        this.changeTask(taskId, { title: incomTitle })
    }
    changeTodolisTitle = (todoId: string, incomTitle: string) => {
        this.props.changeTodolistTitle(todoId, incomTitle)
    }
    changePriority = (taskId: string, incomPriority: number) => {
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
                <TodoListTasks id={this.props.tasks.map((t) => t.id)}
                    changeStatus={this.changeStatus}
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
const mapDispatchToProps = (dispatch: Function) => {
    return {
        loadTasks: (todolistId: string) => {
            let thunk = thunkCreators.loadTasksTC(todolistId);
            dispatch(thunk)
        },
        addTask: (todolistId: string, newText: string) => {
            let thunk = thunkCreators.addTaskTC(todolistId, newText);
            dispatch(thunk)
        },
        changeTodolistTitle: (todolistId: string, title: string) => {
            let thunk = thunkCreators.changeTodolistTitleTC(todolistId, title);
            dispatch(thunk)
        },
        changeTask: (todolistId: string, taskId: string, obj: any) => {
            let thunk = thunkCreators.changeTaskTC(todolistId, taskId, obj);
            dispatch(thunk)
        },
        deleteTodolist: (todolistId: string) => {
            dispatch(thunkCreators.deleteTodolistTC(todolistId))
        },
        deleteTask: (todolistId: string, taskId: string) => {
            dispatch(thunkCreators.deleteTaskTC(todolistId, taskId))
        }
    }
}
const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;