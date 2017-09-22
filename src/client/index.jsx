import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import routes from './routes';
import reducer from '../reducer';

// 初始state
const preloadState = window.INITIAL_STATE;
const store = createStore(reducer, preloadState);

const AppRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);

render(
  <AppRouter />,
  document.getElementById('root'),
);
