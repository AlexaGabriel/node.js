const { DataTypes } = require("sequelize");
const db = require("../db/conect");
const User = require("./User");
const adress = db.define("adress", {
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

adress.belongsTo(User);
module.exports = adress;
