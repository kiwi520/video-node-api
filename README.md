# koa2-base

## 目录结构
```tree
├─ config/              // 用于存放配置文件
├─ controller/          // 用于解析用户的输入，处理后返回相应的结果
├─ errorPage/           // http 请求错误时候，对应的错误响应页面
├─ logs/                // 项目运用中产生的日志数据
├─ models/              // 用于编写业务逻辑层，比如连接数据库，调用第三方接口等
├─ middleware/          // 中间件集中地，用于编写中间件，并集中调用
├─ public/              // 用于放置静态资源
├─ utils/               // 用于放置工具类
├─ views/               // 用于放置模板文件，返回客户端的视图层
├─ router.js            // 配置 URL 路由规则
├─ .gitignore           // git忽略文件
├─ app.js               // 用于自定义启动时的初始化工作，比如启动 https，调用中间件，启动路由等
├─ package.json         // 项目配置版本依赖管理文件
└─ package-lock.json    // 项目配置版本依赖管理锁文件
 ``` # video-node-api
