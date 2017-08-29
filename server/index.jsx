import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import routes from '../client/routes';

const express = require('express');

const app = express();

console.log('path', path.join(__dirname));

// 设置视图引擎
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

// 设置静态资源服务器
app.use(express.static(path.join(__dirname, '..', 'public')));

// 路由
app.get('*', (req, res) => {
  const context = {};
  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
    </StaticRouter>,
  );

  res.render('index', {
    title: 'typee',
    content,
  });
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

