const model = require("../models/Video");
var fs = require('fs');//引入文件读取模块
let video = model.Video
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
// async
let getVideoPath =  (ctx,next) => {
    const res = ctx.res;
    const req = ctx.req;
    let paths = ctx.params
    let document = '/var/html/lv-video-demo/public/videos'
    let path =  document + '/' + paths.path +'.mp4';
    let stat = fs.statSync(path);
    let fileSize = stat.size;
    let range = req.headers.range;

    if (range) {
        console.log("if")
        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

        // end 在最后取值为 fileSize - 1
        end = end > fileSize - 1 ? fileSize - 1 : end;

        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(path, { start, end });
        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        console.log("else")
        let head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }

}

module.exports = {
    getVideoInfo,
    getVideoPath
}