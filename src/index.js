import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
import { ThroughProvider } from 'react-through'
//import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';

import * as serviceWorker from './registerServiceWorker';
import App from './App';
import { store } from './_helpers/store';


ReactDOM.render(
    <ThroughProvider store={store}>
        <App />
    </ThroughProvider>,
    document.getElementById('app')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
