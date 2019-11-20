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

    state = {
        tasks: [
            { title: "JS", isDone: true, priority: "medium" },
            { title: "HTML", isDone: true, priority: "low" },
            { title: "CSS", isDone: true, priority: "low" },
            { title: "ReactJS", isDone: false, priority: "high" }
        ],

        filterValue: "All"
    }

    addTask = (newTitle) => {
        let newTask = {
            title: newTitle,
            isDone: false,
            priority: "high"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if(t != task){
                return t
            }else {
                return {...t, isDone: isDone}
            }
        });
        this.setState({
            tasks: newTasks
        })
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
                    
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks tasks={getFilteredTask(this.state.tasks, this.state.filterValue)}
                        changeStatus={this.changeStatus}
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

