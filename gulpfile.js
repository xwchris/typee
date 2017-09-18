const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');

// 清理发布目录
gulp.task('clean', (callback) => {
  del('public/**/*', callback);
});

// 拷贝静态资源
gulp.task('copy', () => {
  gulp.src('src/client/images/*')
    .pipe(gulp.dest('public/static/images'));
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

// 监听
gulp.task('watch', ['webpack:client', 'webpack:server'], () => {
  gulp.watch('src/client/images/*', ['copy']);
});

// 打包服务器文件
gulp.task('default', ['clean', 'copy', 'webpack:client', 'webpack:server']);
