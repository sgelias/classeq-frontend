import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { alert } from '../views/alerts/_reducers/alerts.reducers';
import { authReducer } from '../views/auth/index';
import { 
    cladesDetailsReducer, 
    cladesListReducer, 
    modelsTrainReducer 
} from '../views/clades/_reducers/_clades.reducers';
import { 
    treesDetailsReducer, 
    treesListReducer 
} from '../views/trees/_reducers/_trees.reducers';
import {
    projectsDetailsReducer,
    projectsListReducer
} from '../views/projects/_reducers/_projects.reducers';


const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'cladesListReducer',
        'cladesDetailsReducer',
        'projectsListReducer',
        'projectsDetailsReducer',
        //'treesListReducer',
        //'treesDetailsReducer',
    ]
};


const loggerMiddleware = createLogger();


const rootReducer = combineReducers({
    alert,
    authReducer,
    treesListReducer,
    treesDetailsReducer,
    cladesListReducer,
    cladesDetailsReducer,
    modelsTrainReducer,
    projectsDetailsReducer,
    projectsListReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(
    persistedReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);


const persistor = persistStore(store);


export { store, persistor };