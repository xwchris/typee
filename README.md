# Typee

## 所用技术
- 整体网站框架 [react](https://github.com/facebook/react),
- 相关联框架，路由相关 [react-router](https://github.com/ReactTraining/react-router),数据相关 [react-redux](https://github.com/reactjs/react-redux)
- 打包工具[webpack](http://webpack.github.io/)
- 工作流构建工具 [gulp](https://gulpjs.com/)
- 代码检测工具 [eslint](https://eslint.org/)
- 项目管理工具 [gitflow](https://github.com/nvie/gitflow/)
- web应用开发框架 [express](http://www.expressjs.com/)

## 网站目标
构建一个方面使用的打字练习网站，面向群体所有想要提高打字速度的人。

## 网站结构
```
typee
  |-- doc // 开发文档
  |-- lib // 三方库
  |-- node_moudles // node包
  |-- public // 发布目录
        |-- static // 静态文件
  |-- src // 源文件
        |-- client // 客户端源文件
              |-- components // 组件
              |-- scenes // 场景页面
              |-- services // 服务
              |-- styles // 样式
        |-- server // 服务端源文件
              |-- index.js // 服务器文件
        |-- views // 视图文件
              |-- error.pug // 错误页面模板
              |-- index.pug // 主页页面模板
              |-- layout.pug // 布局模板
  |-- .eslintrc.js // eslint配置文件
  |-- .gitignore // git忽略配置文件
  |-- gulpfile.js // gulp配置文件
  |-- package-lock.json //自动生成 确定依赖
  |-- package.json // 包依赖
  |-- README.md // 说明文件
  |-- webpack.client.config.js // webpack客户端打包配置文件
  |-- webpack.server.config.js // webpack服务端打包配置文件
        
```

## 功能设想
1. 代码输入（以后加上各文字输入）练习。
2. 对用户的练习结果进行分析，给出报告
3. 针对报给，给出练习建议
4. 提供课程定制（待详细思考）
5. 其他功能待定
