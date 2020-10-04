import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { createReduxStore } from './redux';

import './styles.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createReduxStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement,
);
