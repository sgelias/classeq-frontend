import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { cladesDetailsReducer, cladesListReducer, sequencesListReducer } from '../views/clades/_reducers/_clades.reducers';
import { treesDetailsReducer, treesListReducer } from '../views/trees/_reducers/_trees.reducers';
import { alert } from '../views/alerts/_reducers/alerts.reducers';
import { auth } from '../views/auth/index';


const persistConfig = {
    key: 'root',
    storage,
};


const loggerMiddleware = createLogger();


const rootReducer = combineReducers({
    alert,
    auth,
    treesListReducer,
    treesDetailsReducer,
    cladesListReducer,
    cladesDetailsReducer,
    sequencesListReducer,
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