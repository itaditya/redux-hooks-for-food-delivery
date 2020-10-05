import React from 'react';
import ReactDOM from 'react-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import App from './App';

import './styles.css';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      staleTime: 300000, // 5 minutes
    },
  },
});

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <App />
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  rootElement,
);
