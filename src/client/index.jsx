import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from './routes';
import reducer from '../reducer';

const store = createStore(reducer);

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
