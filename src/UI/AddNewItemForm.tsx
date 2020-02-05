import React from 'react';
import '../App.css';
import { Field } from 'redux-form';
import { requiredField, maxLengthCreator } from '../additionalTools/validators';


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
        this.props.addItem(newText)
        if (newText.trim() === '') {
            return this.setState({
                error: true,
            })
        }else {
            this.setState({
                title: ''
            })
        }
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
        let maxLength = maxLengthCreator(20)
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title"></h3>
                <form className="todoList-newTaskForm">
                <div>
                    <Field 
                    component={'input'}
                    name={'newItem'}
                    validate={[requiredField, maxLength]}
                        className={errorClass}
                        type="text" placeholder="New Item name"
                        onKeyPress={this.onKeyPress} />
                    <button className='addTodolistButton' onClick={this.onAddItemClick}>Add</button>
                </div>
                </form>
            </div>
        );
    }
}

export default AddNewItemForm;

