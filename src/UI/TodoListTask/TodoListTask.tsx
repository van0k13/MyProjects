import React from 'react';
import styles from './TodoListTask.module.css';
import { ITask } from '../../BLL/types';

interface IProps {
    key: string,
    changeTitle: Function,
    changePriority: Function,
    deleteItem: Function,
    changeStatus: Function,
    task: ITask
}
interface IState {
    editModeTitle: boolean,
    title: string,
    priorityStatus: number,
}

class TodoListTask extends React.Component<IProps> {
    

    state:IState = {
        editModeTitle: false,
        title: this.props.task.title,
        priorityStatus: this.props.task.priority,
    }

    onTaskDeleting = () => {
        let task = this.props.task
        this.props.deleteItem(task.id)
    }
    onPriorityChange = (e: React.FormEvent<HTMLInputElement>) => {
        let task = this.props.task
        this.props.changePriority(task.id, e.currentTarget.value)
    }
    onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            title: e.currentTarget.value
        })
    }
    onIsDoneChange = (e: React.FormEvent<HTMLInputElement>) => {
        debugger
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

    render = () => {
        console.log(this.props.task.status)
        let priorityStatus: string = ''
        switch (this.props.task.priority) {
            case 0: priorityStatus = 'low'; break;
            case 1: priorityStatus = 'medium'; break;
            case 2: priorityStatus = 'high'; break;
            case 3: priorityStatus = 'urgent'; break;
            case 4: priorityStatus = 'critical'; break;
            default: return null;
        }
        let taskOrIsDoneStyle = this.props.task.status === 2 ? 'todoList-task-done' : 'todoList-task'
        return (
            <div className={taskOrIsDoneStyle}>
                <input onChange={this.onIsDoneChange} type="checkbox" checked={this.props.task.checked} />
                {this.state.editModeTitle
                    ? <input onBlur={this.deActivateEditModeTitle}
                        onChange={this.onTitleChange}
                        autoFocus={true} value={this.state.title} />
                    : <span  onClick={this.activateEditModeTitle}>{' '}{this.props.task.title} </span>
                },
                     <span >{priorityStatus}</span>
                <button className={styles.removingButton} onClick={this.onTaskDeleting}>X</button>
            </div>
        );
    }
}

export default TodoListTask;

