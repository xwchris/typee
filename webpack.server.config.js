// 本配置文件为webpack服务器端代码配置文件
const path = require('path');
const fs = require('fs');

// 获取需要排除的node_modules文件列表
const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1).forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

// 导出服务端配置
module.exports = {
  // 入口文件
  entry: './src/server/index.js',
  // 指定打包种类 服务端避免打包node文件
  target: 'node',
  // 打包时避免对__dirname进行绝对路径替换
  node: {
    __dirname: true,
  },
  // 打包需要排除的文件
  externals: nodeModules,
  // 输出配置
  output: {
    // 输出路径
    path: path.resolve(__dirname, 'public'),
    // 输出文件名
    filename: 'bundle.server.js',
  },
  // 配置解析模块请求
  resolve: {
    // 使用到的扩展名
    extensions: ['.js', '.json', '.jsx'],
  },
  // 配置相关模块
  module: {
    // 模块规则
    rules: [{
      // 要匹配的文件类型
      test: /\.jsx?$/,
      // 要使用的加载器
      loader: 'babel-loader',
      // 要排除的文件夹
      exclude: path.resolve(__dirname, 'node_modules'),
      // 加载选项
      options: {
        presets: ['es2015', 'react'],
      },
    }],
  },
};
