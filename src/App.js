import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';

class App extends React.Component {

    nextTodoListId = 0;

    state = {
        todolists: [
        ]
    }

    componentDidMount() {
        this.restoreState();
    }

    componentDidUpdate() {
        this.saveState();
    }

    addTodoList = (title) => {
        let newTodoList = {
            id: this.nextTodoListId,
            title: title
        };
        this.nextTodoListId++;
        this.setState({ todolists: [...this.state.todolists, newTodoList] }, this.saveState)
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('todolist_state', stateAsString)
    }

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('todolist_state');
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.todolists.forEach(tl => {
                if (tl.id >= this.nextTodoListId) {
                    this.nextTodoListId++;
                }
            }
            )
        })
    }
    render = () => {

        let todolists = this.state.todolists.map(tl => <TodoList id={tl.id} title={tl.title} />)
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App" >
                    {todolists}
                </div>

            </>
        );
    }
}


export default App;