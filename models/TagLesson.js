const Sequelize = require('sequelize');
const sequelize = require("../utils/sequelize")


const  TagLesson = sequelize.define('tag_lesson',{
    tag_id: {
        type: Sequelize.INTEGER
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
    TagLesson
}