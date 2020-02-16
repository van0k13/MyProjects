import React from 'react';
import styles from './TodoListTitle.module.css'


interface IProps {
    changeTodolisTitle: Function,
    deleteTodolist: any,
    id: string,
    title: string
}
class TodoListTitle extends React.Component<IProps> {
    state = {
        editModeTitle: false,
        title: this.props.title
    }
    componentDidUpdate() {
        if(this.props.title !== this.state.title){
            this.setState({
                title: this.props.title
            })
        }
    }

    activateEditModeTitle = () => {
        this.setState({
            editModeTitle: true
        })
    }
    deActivateEditModeTitle = () => {
        this.props.changeTodolisTitle(this.props.id, this.state.title)
        this.setState({
            editModeTitle: false
        })
    }
    onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            title:  e.currentTarget.value
        })
    }

    render = () => {
        console.log('this props.title   ' + this.props.title)
        console.log('this state.title   ' + this.state.title)
        return (
            <div className={styles.todoListHeader}>
                {this.state.editModeTitle
                    ? <input onBlur={this.deActivateEditModeTitle}
                        onChange={this.onTitleChange}
                        autoFocus={true} value={this.state.title} />
                    : <h3 onClick={this.activateEditModeTitle} className={styles.title}>
                        {this.state.title}
                        
                    </h3>}
                    <button className={styles.removingButton}
                            onClick={this.props.deleteTodolist}>X</button>
            </div>
        );
    }
}

export default TodoListTitle;

