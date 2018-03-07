const Sequelize = require('sequelize');
const sequelize = require("../utils/sequelize")

/**
 * 视频表定义模型
 */
const  Video = sequelize.define('video',{
    title: {
        type: Sequelize.STRING(60)
    },
    path: {
        type: Sequelize.STRING
    },
    lesson_id: {
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
    Video
}