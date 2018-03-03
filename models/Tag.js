const Sequelize = require('sequelize');
const sequelize = require("../utils/sequelize")


const  Tag = sequelize.define('tag',{
    title: {
        type: Sequelize.STRING(60)
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
    Tag
}