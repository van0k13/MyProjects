import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    constructor() {
        super();
        this.newTaskTitleRef = React.createRef();
    }
    componentDidMount() {
        this.restoreState();
    }

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

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state', stateAsString)
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
        let stateAsString = localStorage.getItem('our-state')
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

    addTask = (newTitle) => {
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
            if (t.id != taskId) {
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

                    <TodoListHeader addTask={this.addTask} />
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


export default App;