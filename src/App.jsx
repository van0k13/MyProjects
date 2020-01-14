import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';
import AddNewItemForm from './AddNewItemForm';
import { connect } from 'react-redux';
import { addTodoList, setTodoList } from './reducer';
import axios from 'axios';

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
        axios
            .get("https://social-network.samuraijs.com/api/1.1/todo-lists", {
                withCredentials: true,
                headers: {
                    "API-KEY": "d4a52b38-3f53-4696-96ef-92d8bbcea7be" 
                }
            })
            .then(res => {
                this.props.setTodoList(res.data)
                console.log(res.data);
            });
    }
    addTodoList = (title) => {
        axios
            .post("https://social-network.samuraijs.com/api/1.1/todo-lists",
                { title },
                {
                    withCredentials: true,
                    headers: {
                        "API-KEY": "d4a52b38-3f53-4696-96ef-92d8bbcea7be" //взяли на сайте камасутры (сгенерирован автоматом)
                    }
                })
            .then((res) => {
                let todolist = res.data.data.item;
                this.props.addTodoList(todolist);
            })
    }


    render = () => {
        console.log(this.props)
        const todoList = this.props
            .todolists.map(tl => <TodoList id={tl.id} title={tl.title} tasks={tl.tasks} />)
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

