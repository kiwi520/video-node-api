const router = require('koa-router')()
module.exports = (app) => {
    //获取标签
    router.get('/tags', app.controller.tag.getTagInfo)
    //获取系列视频
    router.get('/lesson/list', app.controller.lesson.getLessonInfo)
    //获取某个标签下的所有系列视频
    router.get('/lesson/:tid', app.controller.lesson.getTagLessonInfo)
    //获取最新系列视频的宣传图
    router.get('/images/:row', app.controller.lesson.getLessonIamgeInfo)
    //获取最新推荐视频
    router.get('/recommend/:row', app.controller.lesson.getRecommendLessonInfo)
    //获取最新热门视频
    router.get('/hot/:row', app.controller.lesson.getHotLessonInfo)
    //获取所属系列视频下的所有视频
    router.get('/video/:lid', app.controller.video.getVideoInfo)
    //分段获取加载视频
    router.get('/videos/:path', app.controller.video.getVideoPath)
    //添加路由组件
    app.use(router.routes()).use(router.allowedMethods())
}