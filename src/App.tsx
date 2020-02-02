import React from 'react';
import './App.css';
import TodoList from './UI/TodoList/TodoList';
import AddNewItemForm from './UI/AddNewItemForm';
import { connect } from 'react-redux';
import {thunkCreators } from './BLL/reducer';
import {IState, Itodolist} from "./BLL/types";


interface IMapDispatchToProps {
    loadTodolists: Function,
    addTodoList: Function,
    

}
interface IMapStateToProps{
    todolists: Itodolist[],
}
class App extends React.Component<IMapDispatchToProps & IMapStateToProps> {
    nextTodoListId: number = 0;
    state: IState = {
        todolists: [],
        nextTaskId: 1
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
            this.state.todolists.forEach((t: any) => {
                if (t.id >= this.nextTodoListId) {
                    this.nextTodoListId = t.id + 1;
                }
            })
        });
    }
    restoreState = () => {
        this.props.loadTodolists()

    }
    addTodoList = (title: string) => {
        this.props.addTodoList(title)
    }

    render = () => {
        const todoList = this.props
            .todolists.map((tl: any) => <TodoList id={tl.id} title={tl.title} tasks={tl.tasks} />)
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


const mapStateToProps = (state: IState): IMapStateToProps => {
    return {
        todolists: state.todolists,
    }
}
const mdtp = (dispatch: Function) => {
    return {
        loadTodolists: () => {
            const thunk = thunkCreators.loadTodolistsTC();
            dispatch(thunk);
        },
        addTodoList: (title: string) => {
            const thunk = thunkCreators.addTodolistTC(title);
            dispatch(thunk)
        }
    }
}
const ConnectedApp = connect(mapStateToProps, mdtp)(App);
export default ConnectedApp;

