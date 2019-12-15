import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ''
    }
    onAddItemClick = () => {
        let newTitle = this.state.title;
        this.setState({ title: '' });
        if (newTitle.trim() === '') {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
            this.props.addItem(newTitle);
        }
    }

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value.trimLeft()
        })
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
        }
    }

    render = () => {
        let classForInput = this.state.error ? 'error' : '';
        return (
            <div className={"todoList-newTaskForm"}>
                <input onKeyPress={this.onKeyPress}
                    onChange={this.onTitleChanged}
                    className={classForInput}
                    value={this.state.title}
                    type={"text"}
                    placeholder={"New item name"} />
                <button onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }
}

export default AddNewItemForm;

