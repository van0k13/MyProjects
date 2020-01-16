import React from 'react';
import styles from './TodoListTask.module.css';

class TodoListTask extends React.Component {

    state = {
        editModeTitle: false,
        editModePriority: false,
        title: this.props.task.title
    }

    onTaskDeleting = () => {
        let task = this.props.task
        this.props.deleteItem(task.id)
    }
    onPriorityChange = (e) => {
        let task = this.props.task
        this.props.changePriority(task.id, e.currentTarget.value)
    }
    onTitleChange = (e) => {
        this.setState({
            title:  e.currentTarget.value
        })
    }
    onIsDoneChange = (e) => {
        let task = this.props.task
        let status = e.currentTarget.checked ? 2 : 0
        this.props.changeStatus(task.id, status)
    }
    activateEditModeTitle = () => {
        this.setState({
            editModeTitle: true
        })
    }
    deActivateEditModeTitle = () => {
        this.props.changeTitle(this.props.task.id, this.state.title)
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
                        autoFocus={true} value={this.state.title} />
                    : <span onClick={this.activateEditModeTitle}>{' '}{this.state.title} </span>
                },
                {this.state.editModePriority
                    ? <input value={this.props.task.priority}
                        onChange={this.onPriorityChange} onBlur={this.deActivateEditModePriority} />
                : <span onClick={this.activateEditModePriority}/>
                }<button className={styles.removingButton} onClick={this.onTaskDeleting}>X</button>
            </div>
        );
    }
}

export default TodoListTask;

