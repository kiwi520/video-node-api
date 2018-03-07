const lesson = require("../models/Lesson");
const sequelize = require("../utils/sequelize");
let Lesson = lesson.Lesson


/**
 * 获取所有视频系列
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
let getLessonInfo = async (ctx, next) => {
    const RowDataPacket = await Lesson.findAll(),
        Info = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: Info
    };
};

/**
 * 获取不同标签所属视频系列
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
let getTagLessonInfo = async (ctx, next) => {
    let tid = ctx.params
    if(tid){
        await sequelize.query('select * from `lessons` inner join `tag_lessons` on `lessons`.`id` = `tag_lessons`.`lesson_id` where `tag_id` = '+ tid.tid
            ).spread(function(results, metadata) {
            ctx.body = {
                code: 200,
                data: JSON.parse(JSON.stringify(results))
            };
        })
    }
};

/**
 * 获取推荐视频
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
let getRecommendLessonInfo = async (ctx,next) => {
    let rows = ctx.params
    if(rows){
        const RowDataPacket = await Lesson.findAll({
                where: {
                    iscommend: 1
                },
                order: [['created_at', 'DESC']],
                limit:parseInt(rows.row)
            }),
            Info = JSON.parse(JSON.stringify(RowDataPacket));
        ctx.body = {
            code: 200,
            data: Info
        };
    }

}

/**
 * 获取热门视频
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
let getHotLessonInfo = async (ctx,next) => {
    let rows = ctx.params
    if(rows) {
        const RowDataPacket = await Lesson.findAll({
                where: {
                    ishot: 1
                },
                order: [['created_at', 'DESC']],
                limit:parseInt(rows.row)
            }),
            Info = JSON.parse(JSON.stringify(RowDataPacket));
        ctx.body = {
            code: 200,
            data: Info
        };
    }
}

/**
 * 首页轮播图数据
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
let getLessonIamgeInfo = async (ctx,next) => {
    let rows = ctx.params
    if(rows) {
        const RowDataPacket = await Lesson.findAll({
                attributes: ['id', 'preview'],
                order: [['created_at', 'DESC']],
                limit:parseInt(rows.row)
            }),
            Info = JSON.parse(JSON.stringify(RowDataPacket));
        ctx.body = {
            code: 200,
            data: Info
        };
    }
}
module.exports = {
    getLessonInfo,
    getTagLessonInfo,
    getRecommendLessonInfo,
    getHotLessonInfo,
    getLessonIamgeInfo
}