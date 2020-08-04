import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { alert } from '../views/alerts/_reducers/alerts.reducers';
import { auth } from '../views/auth/index';
import { treesListReducer, treesDetailsReducer } from '../views/trees/_reducers/_trees.reducers';
import { cladesListReducer, cladesDetailsReducer } from '../views/clades/_reducers/_clades.reducers';


const rootReducer = combineReducers({
    alert,
    auth,
    treesListReducer,
    treesDetailsReducer,
    cladesListReducer,
    cladesDetailsReducer,
});


const loggerMiddleware = createLogger();


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
