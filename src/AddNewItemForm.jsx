import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {
    state = {
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
    onTitleChange = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    }
    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddItemClick()
        }
    }

    render = () => {
        let errorClass = this.state.error === true ? 'error' : '';
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <div className="todoList-newTaskForm">
                    <input onChange={this.onTitleChange}
                        value={this.state.title}
                        className={errorClass}
                        type="text" placeholder="New Item name"
                        onKeyPress={this.onKeyPress} />
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default AddNewItemForm;

