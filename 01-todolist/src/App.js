import React from 'react';
import './App.css';
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

    onAddtaskClick = () => {
        let Title =   this.newTaskTitleRef.current.value  
        let newTask = {
            title: Title,
            isDone: true,
            priority: "high"
        };
        this.newTaskTitleRef.current.value = '';
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
    }

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input  type="text"
                                     placeholder="New task name" 
                                     ref={this.newTaskTitleRef} />
                            <button onClick={this.onAddtaskClick}>Add</button>
                        </div>
                    </div>
                    {/* <TodoListHeader /> */}
                    <TodoListTasks tasks={this.state.tasks} />
                    <TodoListFooter filterValue={this.state.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

