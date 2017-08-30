const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');

// 清理发布目录
gulp.task('clean', (callback) => {
  del(['public/**/*'], callback);
});

// 打包客户端文件
gulp.task('webpack:client', (callback) => {
  webpack(webpackClientConfig, () => {
    callback();
  });
});

// 打包服务器文件
gulp.task('webpack:server', (callback) => {
  webpack(webpackServerConfig, () => {
    callback();
  });
});

// 打包服务器文件
gulp.task('default', ['webpack:client', 'webpack:server']);
