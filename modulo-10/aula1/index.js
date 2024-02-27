const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const conect = require("./db/conect");
const task = require("./models/task");
const port = 3000;
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(express.static("public"));

conect
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
