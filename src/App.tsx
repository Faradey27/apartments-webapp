import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// we using HashRouter instead of BrowserRouter because we deploy on github pages
import styles from './App.module.scss';
import AppHeader from './components/AppHeader';
import Apartment from './screens/Apartment';
import Apartments from './screens/Apartments';
import Payment from './screens/Payment';
import ThankYou from './screens/ThankYou';

const App: React.FC<{}> = () => {
  return (
    <div data-testid="app-root" className={styles.root}>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/apartments/:id/thank-you">
            <Apartment />
            <ThankYou />
          </Route>
          <Route path="/apartments/:id/payment">
            <Apartment />
            <Payment />
          </Route>
          <Route path="/apartments/:id">
            <Apartment />
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
