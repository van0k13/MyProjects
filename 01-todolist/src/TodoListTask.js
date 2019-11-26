import React from 'react';
import './App.css';

const TodoListTask = (props) => {
    let onIsDoneChanged = (e) => {
        props.changeStatus(props.task, e.currentTarget.checked)
    }

    let classesForTask = props.task.isDone
        ? 'todoList-task done' : 'todolist-task';

    return (
        <div className={classesForTask}>
            <input type="checkbox"
                checked={props.task.isDone}
                onChange={onIsDoneChanged} />
            <span>{props.task.title}, priority: {props.task.priority}</span>
        </div>
    );
}


export default TodoListTask;

