import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { RootStore, RootStoreProvider } from './mobx';

import './styles.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider value={new RootStore()}>
      <App />
    </RootStoreProvider>
  </React.StrictMode>,
  rootElement,
);
