const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

const miSend = require('./mi-send')
const miLog = require('./mi-log')
// 引入请求错误中间件
const miHttpError = require('./mi-http-error')
// 引入规则中件间
const miRule = require('./mi-rule')
module.exports = (app) => {
    /**
     * 在接口的开头调用
     * 指定 controller 文件夹下的 js 文件，挂载在 app.controller 属性
     * 指定 models 文件夹下的 js 文件，挂载在 app.models 属性
     */
    miRule({
        app,
        rules: [
            {
                path: path.join(__dirname, '../controller'),
                name: 'controller'
            },
            {
                path: path.join(__dirname, '../models'),
                name: 'models'
            }
        ]
    })
    // 应用请求错误中间件
    app.use(miHttpError({
        errorPageFolder: path.resolve(__dirname, '../errorPage')
    }))
    app.use(miLog())
    app.use(staticFiles(path.resolve(__dirname, "../public")))

    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '../views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    }));

    app.use(bodyParser())
    app.use(miSend())


    app.use(async (ctx, next) => {
        // 允许来自所有域名请求
        ctx.set("Access-Control-Allow-Origin", "*");
        // 这样就能只允许 http://localhost:8080 这个域名的请求了
        // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");

        // 设置所允许的HTTP请求方法
        ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

        // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
        ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

        // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

        // Content-Type表示具体请求中的媒体类型信息
        ctx.set("Content-Type", "application/json;charset=utf-8");

        // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
        // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
        ctx.set("Access-Control-Allow-Credentials", true);

        // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
        // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
        // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
        ctx.set("Access-Control-Max-Age", 300);

        /*
        CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
            Cache-Control、
            Content-Language、
            Content-Type、
            Expires、
            Last-Modified、
            Pragma。
        */
        // 需要获取其他字段时，使用Access-Control-Expose-Headers，
        // getResponseHeader('myData')可以返回我们所需的值
        ctx.set("Access-Control-Expose-Headers", "myData");

        await next();
    })

    // 增加错误的监听处理
    app.on("error", (err, ctx) => {
        if (ctx && !ctx.headerSent && ctx.status < 500) {
            ctx.status = 500
        }
        if (ctx && ctx.log && ctx.log.error) {
            if (!ctx.state.logged) {
                ctx.log.error(err.stack)
            }
        }
    })

}