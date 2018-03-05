const Koa = require('koa')

const app = new Koa()

// 添加路由
const router = require('./router')
const middleware = require('./middleware')

middleware(app)
router(app)

app.listen(3331, ()=>{
    console.log('server is running at http://localhost:3331')
})