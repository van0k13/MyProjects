import React from 'react';
import './App.css';
import TodoList from './UI/TodoList/TodoList';
import AddNewItemForm from './UI/AddNewItemForm';
import { connect } from 'react-redux';
import { addTodoList, setTodoList } from './BLL/reducer';
import { api } from './DAL/api';

class App extends React.Component {
    nextTodoListId = 0;
    state = {
        todolists: []
    }
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
    _resoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('mainTest-todolist');
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.todolists.forEach(t => {
                if (t.id >= this.nextTodoListId) {
                    this.nextTodoListId = t.id + 1;
                }
            })
        });
    }
    restoreState = () => {
           api.getTodolists()
           .then(res => {
                this.props.setTodoList(res)
            });
    }
    addTodoList = (title) => {
       api.addTodolist(title)
            .then((res) => {
                let todolist = res.data.item;
                this.props.addTodoList(todolist);
            })
    }


    render = () => {
        const todoList = this.props
            .todolists.map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks} />)
        return (
            <>
                <div className='header'>
                    <AddNewItemForm addItem={this.addTodoList} />
                </div>
                <div className="App">
                    {todoList}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists,
    }
}
const ConnectedApp = connect(mapStateToProps, { addTodoList, setTodoList })(App);
export default ConnectedApp;

