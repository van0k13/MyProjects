import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';
import AddNewItemForm from './AddNewItemForm';
import { connect } from 'react-redux';
import { ADD_TODOLLIST, addTodoListAC } from './reducer';

class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    }
    componentDidUpdate() {
        this.saveState();
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
        debugger
      let newTask = {
            id: this.state.nextTaskId,
            title: newTitle,
            tasks: []
        };
        this.state.nextTaskId++;
       this.props.addTodolist(newTask)
    }
    

    render = () => {
        const todoList = this.props
        .todolists.map(tl => <TodoList id={tl.id} title={tl.title} tasks={tl.tasks} />)
        return (
            <>
                <div className='header'>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoList}
                </div>
            </>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodoList) => {
            const action = addTodoListAC(newTodoList);
            dispatch(action)
        }
        
    }
}
const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

