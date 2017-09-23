// 本配置文件为webpack客户端代码配置文件
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// 获取插件
function getPlugins(env) {
  // 如果是开发环境
  if (env === 'development') {
    return [
      // 分离插件
      new ExtractTextPlugin('style.css'),
      // 热加载插件
      new webpack.HotModuleReplacementPlugin(),
      // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
      new webpack.NoEmitOnErrorsPlugin(),
    ];
  }
  // 如果是生产环境
  return [
    // 分离插件
    new ExtractTextPlugin('style.css'),
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

// 是否有调试工具
function getDevTool(env) {
  // 开发环境
  if (env === 'development') {
    return 'eval-source-map';
  }
  // 生产环境
  return '';
}

// 导出客户端配置
module.exports = function webpackClientConfig(env = 'development') {
  // 返回配置对象
  return {
    // 调试工具
    devtool: getDevTool(env),
    // 入口文件
    entry: ['./src/client/index.jsx', './src/client/style.less'],
    // 打包类型
    target: 'web',
    // 输出配置
    output: {
      // 输出路径
      path: path.resolve(__dirname, 'public'),
      // 输出文件名
      filename: 'bundle.client.js',
    },
    // 配置解析模块请求
    resolve: {
      // 使用到的扩展名
      extensions: ['.js', '.json', '.jsx', '.css', '.less'],
      // 配置文件夹别名
      alias: {
        components: path.resolve(__dirname, 'src/client/components'),
        scenes: path.resolve(__dirname, 'src/client/scenes'),
        services: path.resolve(__dirname, 'src/client/services'),
        styles: path.resolve(__dirname, 'src/client/styles'),
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
        // 加载选项
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 versions', 'safari >= 7'],
              },
            }], 'react',
          ],
        },
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      }],
    },
    // 插件配置
    plugins: getPlugins(env),
  };
};
