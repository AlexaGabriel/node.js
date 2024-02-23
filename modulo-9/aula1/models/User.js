const { DataTypes } = require("sequelize");
const db = require("../db/conect");
const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ocupations: {
    type: DataTypes.STRING,
    required: true,
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
module.exports = User;
