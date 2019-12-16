import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    state = {
        editModeTitle: false,
        editModePriority: false
    }

    onPriorityChange = (e) => {
        let task = this.props.task
        this.props.changePriority(task.id, e.currentTarget.value)
    }
    onTitleChange = (e) => {
        let task = this.props.task
        this.props.changeTitle(task.id, e.currentTarget.value)
    }
    onIsDoneChange = (e) => {
        let task = this.props.task
        this.props.changeStatus(task.id, e.currentTarget.checked)
    }
    activateEditModeTitle = () => {
        this.setState({
            editModeTitle: true
        })
    }
    deActivateEditModeTitle = () => {
        this.setState({
            editModeTitle: false
        })
    }
    activateEditModePriority = () => {
        this.setState({
            editModePriority: true
        })
    }
    deActivateEditModePriority = () => {
        this.setState({
            editModePriority: false
        })
    }

    render = () => {
        let taskOrIsDoneStyle = this.props.task.isDone === true ? 'todoList-task-done' : 'todoList-task'
        return (
            <div className={taskOrIsDoneStyle}>
                <input onChange={this.onIsDoneChange} type="checkbox" checked={this.props.task.isDone} />
                {this.state.editModeTitle
                    ? <input onBlur={this.deActivateEditModeTitle}
                        onChange={this.onTitleChange}
                        autoFocus={true} value={this.props.task.title} />
                    : <span onClick={this.activateEditModeTitle}> {this.props.task.id}.{' '}{this.props.task.title} </span>
                },
                {this.state.editModePriority
                    ? <input value={this.props.task.priority}
                        onChange={this.onPriorityChange} onBlur={this.deActivateEditModePriority} />
                    : <span onClick={this.activateEditModePriority}> priority: {this.props.task.priority}</span>
                }
            </div>
        );
    }
}

export default TodoListTask;

