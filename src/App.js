import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { history } from './_helpers/history';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route component={DashboardLayout} />
      </Switch>
    </Router>
  );
}
