import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const AppRouter = () => (
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>
);

render(
  <AppRouter />,
  document.getElementById('root'),
);
