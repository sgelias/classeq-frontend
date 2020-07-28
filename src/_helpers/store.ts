import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { alert } from '../views/alerts/_reducers/alerts.reducers';
import { auth } from '../views/auth/index';
import { treesReducers } from '../views/trees/_reducers/trees.reducers';


const rootReducer = combineReducers({
    alert,
    auth,
    treesReducers,
});


const loggerMiddleware = createLogger();


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
