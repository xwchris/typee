// 本配置文件为webpack服务器端代码配置文件
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// 获取需要排除的node_modules文件列表
const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1).forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

// 获取插件
function getPlugins(env) {
  // 如果是开发环境
  if (env === 'development') {
    return [];
  }
  return [
    // 定义环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // js优化插件
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: true,
    }),
  ];
}

// 导出服务端配置
module.exports = function webpackServerConfig(env) {
  return {
    // 调试工具
    devtool: 'eval-source-map',
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
      // 配置文件夹别名
      alias: {
        components: path.resolve(__dirname, './src/client/components'),
        scenes: path.resolve(__dirname, './src/client/scenes'),
        services: path.resolve(__dirname, './src/client/services'),
        styles: path.resolve(__dirname, './src/client/styles'),
        mixin$: path.resolve(__dirname, 'src/client/mixins.js'),
        config$: path.resolve(__dirname, 'src/config.js'),
      },
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
          presets: [
            ['env', {
              targets: {
                node: 'current',
              },
            }], 'react',
          ],
        },
      }],
    },
    // 插件
    plugins: getPlugins(env),
  };
};
