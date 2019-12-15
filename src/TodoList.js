import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import AddNewItemForm from './AddNewItemForm';
import TodoListTitle from './TodoListTitle';

class TodoList extends React.Component {



    nextTaskId = 0;

    state = {
        tasks: [
            // { id: 0, title: "JS", isDone: true, priority: "medium" },
            // { id: 1, title: "HTML", isDone: true, priority: "low" },
            // { id: 2, title: "CSS", isDone: true, priority: "low" },
            // { id: 3, title: "ReactJS", isDone: false, priority: "high" }
        ],

        filterValue: "All"
    }

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state' + this.props.id, stateAsString)
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
        let stateAsString = localStorage.getItem('our-state' + this.props.id)
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach((task) => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id++
                }
            })
        });
    }

    addItem = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: false,
            priority: "high"
        };
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        }, () => { this.saveState(); });
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => { this.saveState(); });
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, { isDone: isDone })
    }
    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, { title: newTitle })
    }
    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t
            } else {
                return { ...t, ...obj }
            }
        });

        this.setState({
            tasks: newTasks
        }, () => { this.saveState(); })
    }

    render = () => {
        const getFilteredTask = (tasks, filter) => {
            return tasks.filter(t => {
                switch (filter) {
                    case 'All': return true;
                    case 'Completed': return t.isDone;
                    case 'Active': return !t.isDone;
                }
            }
            )
        };
        return (
            <div className="App" >
                <div className="todoList">
                    <div className={"todoList-header"}>
                        <TodoListTitle title={this.props.title} />
                        <AddNewItemForm addItem={this.addItem} />
                    </div>
                    <TodoListTasks tasks={getFilteredTask(this.state.tasks, this.state.filterValue)}
                        changeStatus={this.changeStatus} changeTitle={this.changeTitle}
                    />
                    <TodoListFooter filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }
}


export default TodoList;