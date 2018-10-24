/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AdminContainer from '../AdminContainer/index';
import DataComponent from '../DataComponent/index';
import ReferenceDetails from '../ReferenceDetails/index';

export default function App() {
  return (
    <div style={{ padding: 30 }}>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/test" component={DataComponent} />
        <Route exact path="/reference" component={ReferenceDetails} />
        <Route exact path="/" component={AdminContainer} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
