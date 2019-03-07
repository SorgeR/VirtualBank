import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import usersReducer from '../users/store/usersReducer';

const reducers = combineReducers({ usersReducer });

const store = createStore(reducers,
    applyMiddleware(thunkMiddleware));

export default store;
