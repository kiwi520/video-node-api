const Sequelize = require('sequelize');
const sequelize = require("../utils/sequelize")

/**
 * 视频系列表定义模型
 */
const  Lesson = sequelize.define('lesson',{
    title: {
        type: Sequelize.STRING(60)
    },
    introduce: {
        type: Sequelize.STRING
    },
    preview: {
        type: Sequelize.STRING
    },
    iscommend: {
        type: Sequelize.ENUM(0, 1)
    },
    ishot: {
        type: Sequelize.ENUM(0, 1)
    },
    click: {
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    }
})
module.exports = {
    Lesson
}