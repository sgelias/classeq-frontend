import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { alert } from '../views/alerts/_reducers/alerts.reducers';
import { auth } from '../views/auth/_reducers/auth.reducers';


const rootReducer = combineReducers({
    alert,
    auth,
});


const loggerMiddleware = createLogger();


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
