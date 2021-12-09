const { Sequelize } = require('sequelize');
const config = require("../config/db.js");

const sequelize = new Sequelize(config.db, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: {
    // if you are not using mamp, but hide it
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.chat = require("./chat.js")(sequelize, Sequelize);
db.tweet = require("./tweet.js")(sequelize, Sequelize);


module.exports = db;
