import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';

class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    }
    componentDidUpdate() {
        this.saveState();
    }
    state = {
        todolists: [],
        nextTaskId: 1
    }
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('mainTest-todolist', stateAsString)
    }
    restoreState = () => {
        let state = {
            tasks: []
        };
        let stateAsString = localStorage.getItem('mainTest-todolist');
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state)
    }
    addTodoList = (newTitle) => {
      let newTask = {
            id: this.state.nextTaskId,
            title: newTitle
        };
        this.state.nextTaskId++;
        let newTasks = [...this.state.todolists, newTask];
        this.setState({
            todolists: newTasks
        })
    }

    render = () => {
        const todoList = this.state.todolists.map(tl => <TodoList id={tl.id} title={tl.title} />)
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoList}
                </div>
            </>
        );
    }
}

export default App;

