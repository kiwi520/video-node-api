const lesson = require("../models/Lesson");
const taglesson = require("../models/TagLesson");
const sequelize = require("../utils/sequelize")
let Lesson = lesson.Lesson
let TagLesson = taglesson.TagLesson
let getLessonInfo = async (ctx, next) => {
    const RowDataPacket = await Lesson.findAll(),
        Info = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: {
            adminInfo: Info
        }
    };
};

let getTagLessonInfo = async (ctx, next) => {
    let tid = ctx.params
    // ctx.body = tid
    if(tid){
        // console.log(tid)
        await sequelize.query('select * from `lessons` inner join `tag_lessons` on `lessons`.`id` = `tag_lessons`.`lesson_id` where `tag_id` = '+ tid.tid
            ).spread(function(results, metadata) {
            ctx.body = {
                code: 200,
                data: {
                    adminInfo: results
                }
            };
            // console.log(metadata)
            // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
        })
    }
};

let getRecommendLessonInfo = async (ctx,next) =>{
    const RowDataPacket = await Lesson.findAll({
            where: {
                iscommend: 1
            }
        }),
        Info = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        code: 200,
        data: {
            adminInfo: Info
        }
    };
}

let getHotLessonInfo = async (ctx,next) =>{
    const RowDataPacket = await Lesson.findAll({
            where: {
                ishot: 1
            }
        }),
        Info = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        code: 200,
        data: {
            adminInfo: Info
        }
    };
}

module.exports = {
    getLessonInfo,
    getTagLessonInfo,
    getRecommendLessonInfo,
    getHotLessonInfo,
}