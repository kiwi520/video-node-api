module.exports = {
    index: async(ctx, next) => {
        await ctx.render("home/index", {title: "吊打👁"})
    },
    home: async(ctx, next) => {
        ctx.send({status:"200"})
        ctx.log.error("测试一下")
        // ctx.response.body = '<h1>HOME page</h1>'
    },
    homeParams: async(ctx, next) => {
        console.log(ctx.params)
        ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },

    login: async(ctx, next) => {
        await ctx.render('home/login',{
            btnName: 'GoGoGo'
        })
    },
    register: async(ctx, next) => {
        // 解构出 app 实例对象
        const { app } = ctx
        let params = ctx.request.body
        let name = params.name
        let password = params.password
        // 留意 models 层的调用方式
        let res = await app.models.home.register(name,password)
        if(res.status == "-1"){
            await ctx.render("home/login", res.data)
        }else{
            ctx.state.title = "个人中心"
            await ctx.render("home/success", res.data)
        }
    }
}