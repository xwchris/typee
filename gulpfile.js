const gulp = require('gulp');
const webpack = require('webpack');
const clean = require('gulp-clean');
const run = require('gulp-run');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');

// 清理发布目录
gulp.task('clean', () => {
  gulp.src('public', { read: false })
    .pipe(clean());
});

// 拷贝静态资源
gulp.task('copy', ['clean'], () => {
  gulp.src('src/client/images/*')
    .pipe(gulp.dest('public/static/images'));
});

// 打包客户端文件
gulp.task('webpack:client', ['clean'], (callback) => {
  webpack(webpackClientConfig, () => {
    callback();
  });
});

// 打包服务器文件
gulp.task('webpack:server', ['clean'], (callback) => {
  webpack(webpackServerConfig, () => {
    callback();
  });
});

// 监听
gulp.task('watch', ['webpack:client', 'webpack:server'], () => {
  gulp.watch('src/client/images/*', ['copy']);
});

// 启动测试服务器
gulp.task('dev', ['clean', 'copy', 'webpack:client', 'webpack:server'], () => {
  return run("npm run server:dev");
});

// 打包服务器文件
gulp.task('default', ['clean', 'copy', 'webpack:client', 'webpack:server']);
