import path from 'path';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import routes from '../client/routes';

// 创建服务器实例
const app = express();

// 设置视图引擎
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

// 设置静态资源服务器
app.use(express.static(path.join(__dirname, '../..', 'public')));

// 路由设置
app.get('*', (req, res) => {
  const context = {};
  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
    </StaticRouter>,
  );

  // 服务端渲染
  res.render('index', {
    title: 'typee',
    content,
  });
});

// 监听服务器3000端口
app.listen(3000);

