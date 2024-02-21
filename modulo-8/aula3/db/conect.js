const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});
module.exports = pool;

//sgp_a0d7ccb4f752ea73_a551cf70e239ca022e2c4b3453ccbe42c0ccc4ef
