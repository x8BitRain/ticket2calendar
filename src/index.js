import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { createStore, StoreProvider } from 'react-context-global-store';
import * as serviceWorker from './serviceWorker';

const store = createStore({
  airports: { // The first level of the sub-store must be an object
  	ready: false, 
    origin: { // The second level substore can be an array or other data structure
      lat: null,
      lng: null,
    },
    destination: { // The second level substore can be an array or other data structure
      lat: null,
      lng: null,
    },
  }
});

ReactDOM.render(<StoreProvider store={store}><App /></StoreProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
