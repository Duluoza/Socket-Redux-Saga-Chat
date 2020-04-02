import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store'

import App from './App';
import './index.css'

const app = (
  <Provider store={configureStore()}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root')
);