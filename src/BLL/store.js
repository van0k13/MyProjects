import { createStore, applyMiddleware } from "redux";
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk'

// const combinedParametres = () => {
//     return applyMiddleware(thunkMiddleware), composeWithDevTools()
    
// }
const store = createStore(reducer, applyMiddleware(thunkMiddleware) );

export default store;