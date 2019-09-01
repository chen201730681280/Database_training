const Sequelize = require('sequelize')
// 引入连接池配置
const config = require('../config/db')

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  // dialectOptions: {
  //     socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
  // },
  pool: {
      max: 5,
      min: 0,
      idle: 30000
  }
});

module.exports = sequelize