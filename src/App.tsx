import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Apartment from './screens/Apartment';
import Apartments from './screens/Apartments';
import Payment from './screens/Payment';
import ThankYou from './screens/ThankYou';

const App: React.FC<{}> = () => {
  return (
    <div data-testid="app-root">
      <Router>
        <Switch>
          <Route path="/apartments/:id">
            <Apartment />
          </Route>
          <Route path="/apartments">
            <Apartments />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/thank-you">
            <ThankYou />
          </Route>
          <Route path="/">
            <Apartments />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
