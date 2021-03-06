const model = require("../models/Video");
//引入文件读取模块
var fs = require('fs');
let video = model.Video

/**
 * 获取单个具体视频信息
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
let getVideoInfo = async (ctx,next) =>{
    let lid = ctx.params
    const RowDataPacket = await video.findAll({
            where: {
                lesson_id: lid.lid
            }
        }),
        Info = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        code: 200,
        data: Info
    };
}

/**
 * 分段实现加载视频
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
let getVideoPath = async (ctx,next) => {
    let paths = ctx.params
    // let document = '/var/html/lv-video-demo/public/videos'
    let document = '/var/www/html/videoadmin/public/videos'
    let path =  document + '/' + paths.path +'.mp4';
    let stat = fs.statSync(path);
    let fileSize = stat.size;
    let range = ctx.headers.range;
    if (range) {
        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

        // end 在最后取值为 fileSize - 1
        end = end > fileSize - 1 ? fileSize - 1 : end;

        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(path, { start, end });
        ctx.status = 206
        ctx.set('Content-Range',`bytes ${start}-${end}/${fileSize}`)
        ctx.set('Accept-Ranges','bytes')
        ctx.set('Content-Length',chunksize)
        ctx.set('Content-Type','video/mp4')
        ctx.body = file
    } else {

    }

}

module.exports = {
    getVideoInfo,
    getVideoPath
}