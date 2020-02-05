import { createStore, applyMiddleware, combineReducers } from "redux";
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'

const reducerPack = combineReducers({
    mainReducer: reducer,
    form: formReducer
})

const store = createStore(reducerPack, applyMiddleware(thunkMiddleware) );

export default store;