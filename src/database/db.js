const { Sequelize } = require("sequelize");
const database = require("../config");

const sequelize = new Sequelize(
  database.database,
  database.usermane,
  database.password,
  {
    dialect: "sqlite",
    storage: "./src/database/db.sqlite",
  }
);

module.exports = sequelize;