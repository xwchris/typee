const gulp = require('gulp');
const webpack = require('webpack');
const createConfig = require('./webpack.config.js');

// 打包客户端文件
gulp.task('webpack:client', (callback) => {
  webpack(createConfig('client'), () => {
    callback();
  });
});

// 打包服务器文件
gulp.task('webpack:server', (callback) => {
  webpack(createConfig('server'), () => {
    callback();
  });
});

// 打包服务器文件
gulp.task('default', ['webpack:client', 'webpack:server']);
