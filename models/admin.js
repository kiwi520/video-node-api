const Sequelize = require('sequelize');
const sequelize = require("../utils/sequelize")


const  Admin = sequelize.define('admin',{
    name: {
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
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
    Admin
}