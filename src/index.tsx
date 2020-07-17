import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import App from './App';
import { configureStore } from './state';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './index.scss';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale="en">
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
