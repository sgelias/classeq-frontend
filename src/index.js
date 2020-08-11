import React from 'react';
import ReactDOM from 'react-dom';
import { ThroughProvider } from 'react-through'
import { PersistGate } from 'redux-persist/integration/react';

import * as serviceWorker from './registerServiceWorker';
import App from './App';
import { store, persistor } from './_helpers/_store';
import './assets/images/fontawesome/fontawesome';


ReactDOM.render(
    <ThroughProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </ThroughProvider>,
    document.getElementById('app')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
