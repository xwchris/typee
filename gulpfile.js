const gulp = require('gulp');
const webpack = require('webpack');
const run = require('gulp-run');
const del = require('del');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');

const NODE_ENV = 'production';
// const NODE_ENV = 'development';

// 清理发布目录
gulp.task('clean', () => {
  del(['public']);
});

// 打包客户端文件
gulp.task('webpack:client', ['clean'], (callback) => {
  webpack(webpackClientConfig(NODE_ENV), () => {
    callback();
  });
});

// 打包服务器文件
gulp.task('webpack:server', ['clean'], (callback) => {
  webpack(webpackServerConfig(NODE_ENV), () => {
    callback();
  });
});

// 拷贝静态资源
gulp.task('copy', ['webpack:client', 'webpack:server'], () => {
  gulp.src('src/client/images/*')
    .pipe(gulp.dest('public/static/images'));
});

// 监听
gulp.task('watch', ['webpack:client', 'webpack:server'], () => {
  gulp.watch('src/client/images/*', ['copy']);
});

// 启动测试服务器
gulp.task('dev', ['clean', 'copy', 'webpack:client', 'webpack:server'], () => run('npm run server:dev'));

// 打包服务器文件
gulp.task('default', ['clean', 'copy', 'webpack:client', 'webpack:server']);
