import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: ''
    }
    onAddTaskClick = () => {
        let newTitle = this.state.title;
        this.setState({title: ''});
        if (newTitle.trim() === '') {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
            this.props.addTask(newTitle);
        }
    }

    onTitleChanged = (e) => {
        this.setState({ error: false,
        title: e.currentTarget.value.trimLeft()
     })
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddTaskClick();
        }
    }

    render = () => {
        let classForInput = this.state.error ? 'error' : '';
        return (
            <div className={"todoList-header"}>
                <h3 className={"todoList-header__title"}>What to Learn</h3>
                <div className={"todoList-newTaskForm"}>
                    <input onKeyPress={this.onKeyPress}
                        onChange={this.onTitleChanged}
                        className={classForInput}
                        value={this.state.title}
                        type={"text"}
                        placeholder={"New task name"} />
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

