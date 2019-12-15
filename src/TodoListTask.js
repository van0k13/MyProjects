import React from 'react';
import './App.css';



class TodoListTask extends React.Component {
    state = {
        editMode: false
    }
    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    }
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    }

    activateEditMode = () => {
        this.setState({ editMode: true })
    }

    deActivateEditMode = () => {
        this.setState({ editMode: false })
    }

    render() {

        let classesForTask = this.props.task.isDone
            ? 'todoList-task done' : 'todolist-task';

        return (
            <div className={classesForTask}>
                <input type="checkbox"
                    checked={this.props.task.isDone}
                    onChange={this.onIsDoneChanged} />
                {this.state.editMode
                    ? <input onBlur={this.deActivateEditMode}
                     autoFocus={true}
                      value={this.props.task.title}
                      onChange={this.onTitleChanged} />
                    : <span onClick={this.activateEditMode}>{this.props.task.id}: {this.props.task.title}</span>
                }, priority: {this.props.task.priority}

            </div>
        );
    }
}

export default TodoListTask;

