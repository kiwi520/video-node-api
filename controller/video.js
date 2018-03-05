const model = require("../models/Video");
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

let getVideoPath = async () => {
    let path = ctx.params
    ctx.body = path.path
}

module.exports = {
    getVideoInfo,
    getVideoPath
}