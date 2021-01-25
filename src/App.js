import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/_store';
import { history } from './_helpers/_history';
import DashboardLayout from './layouts/DashboardLayout';
import { AuthLayout } from './layouts';
import './vibe/scss/styles.scss';


export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path={'/auth/'} component={AuthLayout} />
          <Route path={'/'} component={DashboardLayout} />
        </Switch>
      </Router>
    </Provider>
  );
}
