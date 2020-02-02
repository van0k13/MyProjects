import React from 'react';
import '../App.css';
import TodoListTask from './TodoListTask/TodoListTask';
import { ITask } from '../BLL/types';


interface IProps {
    id: any,
    changeStatus: Function,
    deleteItem: Function,
    changePriority: Function,
    changeTitle: Function,
    tasks: any

}
class TodoListTasks extends React.Component<IProps> {
    render = () => {
        let taskElements = this.props.tasks.map( 
            (t: ITask) => <TodoListTask key={t.id} changeTitle={this.props.changeTitle} 
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

