import React from 'react';
import './App.css';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm';

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
            this.state.tasks.map(t=> {
                if(t.id >= this.nextTaskId) {
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
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        })
    }

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            } else {
                return { ...t, ...obj}
            }
        })
        this.setState({tasks: newTasks})
        this.saveState()
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }
    changeTitle = (taskId, incomTitle) => {
        this.changeTask(taskId, {title: incomTitle})
    }
    changePriority = (taskId, incomPriority) => {
        this.changeTask(taskId, {priority: incomPriority})
    }

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListTitle title={this.props.title}/>
                    <AddNewItemForm addItem={this.addItem} />
                    <TodoListTasks changeStatus={this.changeStatus}
                    changePriority={this.changePriority}
                    changeTitle={this.changeTitle}
                    tasks={this.state.tasks.filter(t => {
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
            </div>
        );
    }
}

export default TodoList;

