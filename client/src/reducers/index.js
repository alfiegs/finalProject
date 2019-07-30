import {combineReducers} from 'redux'; //a function that takes in all reducers you pass into it
import {reducer as formReducer} from 'redux-form';
import auth from './auth';

export default combineReducers({ //object as argument, pass in reducers
    auth: auth,
    form: formReducer
}) 