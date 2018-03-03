const Sequelize = require('sequelize');
const Config  = require('../config/sequelize/db')
console.log('init sequelize...');

module.exports = new Sequelize( Config.database,Config.username, Config.password, {
    host: Config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});