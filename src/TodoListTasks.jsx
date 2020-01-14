import React from 'react';
import './App.css';
import TodoListTask from './TodoListTask/TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {
        let taskElements = this.props.tasks.map( 
            t => <TodoListTask changeTitle={this.props.changeTitle} 
            changePriority={this.props.changePriority}
            deleteItem={this.props.deleteItem}
            changeStatus={this.props.changeStatus} task={t}/>)
        return (
                    <div className="todoList-tasks">
                        {taskElements}
                    </div>
        );
    }
}

export default TodoListTasks;

