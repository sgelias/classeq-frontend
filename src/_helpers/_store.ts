import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { cladesDetailsReducer, cladesListReducer, sequencesListReducer } from '../views/clades/_reducers/_clades.reducers';
import { treesDetailsReducer, treesListReducer } from '../views/trees/_reducers/_trees.reducers';
import { alert } from '../views/alerts/_reducers/alerts.reducers';
import { auth } from '../views/auth/index';

const rootReducer = combineReducers({
    alert,
    auth,
    treesListReducer,
    treesDetailsReducer,
    cladesListReducer,
    cladesDetailsReducer,
    sequencesListReducer,
});


const loggerMiddleware = createLogger();


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
