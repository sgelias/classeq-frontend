import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/store';
import { history } from './_helpers/history';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route component={DashboardLayout} />
        </Switch>
      </Router>
    </Provider>
  );
}
