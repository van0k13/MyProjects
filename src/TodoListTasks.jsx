import React from 'react';
import './App.css';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {

        let taskElements = this.props.tasks.map( 
            t => <TodoListTask changeTitle={this.props.changeTitle} 
            changePriority={this.props.changePriority}
            changeStatus={this.props.changeStatus} task={t}/>)
        return (
                    <div className="todoList-tasks">
                        {taskElements}
                    </div>
        );
    }
}

export default TodoListTasks;
