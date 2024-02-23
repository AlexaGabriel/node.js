const sequelize = require("sequelize");

const Sequelizer = new sequelize("sequelize", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = Sequelizer;
//sgp_a0d7ccb4f752ea73_a551cf70e239ca022e2c4b3453ccbe42c0ccc4ef
