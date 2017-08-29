const path = require('path');
const fs = require('fs');

function getEntry(env) {
  const entry = {
    client: './client/index.jsx',
    server: './server/index.jsx',
  };

  return entry[env] || '';
}

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1).forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = function createConfig(env) {
  return {
    // 调试工具
    devtool: 'eval-source-map',
    // 入口文件
    entry: getEntry(env),

    target: env === 'server' ? 'node' : 'web',

    node: {
      __dirname: true,
    },

    // 要排除的文件
    externals: env === 'server' ? nodeModules : {},

    // 输出配置
    output: {
      // 输出路径
      path: path.resolve(__dirname, 'public'),

      // 输出文件名
      filename: `bundle.${env}.js`,
    },

    // 配置解析模块请求
    resolve: {
      // 使用到的扩展名
      extensions: ['.js', '.json', '.jsx', '.css'],
    },

    // 配置相关模块
    module: {
      // 模块规则
      rules: [{
        // 要匹配的文件类型
        test: /\.jsx?$/,
        // 要使用的加载器
        loader: 'babel-loader',
        // 要包括的文件夹
        exclude: env === 'server' ? [
          path.resolve(__dirname, 'node_modules'),
        ] : [],
        options: {
          presets: ['es2015', 'react'],
        },
      }],
    },
  };
};
