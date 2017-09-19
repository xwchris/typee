import path from 'path';
import React from 'react';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducer';
import routes from '../client/routes';
import webpackClientConfig from '../../webpack.client.config';

const compiler = webpack(webpackClientConfig);
// 创建服务器实例
const app = express();
const store = createStore(reducer);

// 设置视图引擎
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

// 客户端热加载
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackClientConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

// 设置静态资源服务器
app.use('/static', express.static(path.join(__dirname, '../..', 'public/static')));

// 路由设置
app.get('*', (req, res) => {
  const context = {};
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>,
  );

  // 服务端渲染
  res.render('index', {
    title: 'typee',
    content,
  });
});

// 监听服务器3000端口
app.listen(3000);

