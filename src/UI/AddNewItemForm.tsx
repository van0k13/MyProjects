import React from 'react';
import '../App.css';


interface IProps {
    addItem: Function
}
interface IState {
error: boolean,
title: string
}
class AddNewItemForm extends React.Component<IProps> {
    state: IState = {
        error: false,
        title: ''
    }

    onAddItemClick = () => {
        let newText = this.state.title
        if (newText.trim() === '') {
            return this.setState({
                error: true,
            })
        }else {
            this.setState({
                title: ''
            })
        }
        this.props.addItem(newText);
    }
    onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    }
    onKeyPress = (e: KeyboardEventInit) => {
        if (e.key === 'Enter') {
            this.onAddItemClick()
        }
    }

    render = () => {
        let errorClass = this.state.error === true ? 'error' : '';
        return (
                <div className="todoList-newTaskForm">
                    <input onChange={this.onTitleChange}
                        value={this.state.title}
                        className={errorClass}
                        type="text" placeholder="New Item name"
                        onKeyPress={this.onKeyPress} />
                    <button className='addTodolistButton' onClick={this.onAddItemClick}>Add</button>
                </div>
        );
    }
}

export default AddNewItemForm;