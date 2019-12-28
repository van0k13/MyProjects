import React from 'react';
import styles from './TodoListTitle.module.css'

class TodoListTitle extends React.Component {

    render = () => {
        return (
            <div className={styles.todoListHeader}>
                <h3 className={styles.title}>
                    {this.props.title}
                    <button className={styles.removingButton}
                        onClick={this.props.deleteTodolist}>X</button>
                </h3>
            </div>
        );
    }
}

export default TodoListTitle;

