const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

const port = 3000;

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", function (req, res) {
  const title = req.body.title;
  const page = req.body.page;

  const query = `INSERT INTO books (title, page) VALUES ('${title}', ${page})`;

  conect.query(query, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect("/");
  });
});

const conect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

conect.connect(function (err) {
  if (err) {
    console.log(err);
  }

  console.log("Conectado ao MySQL!");

  app.listen(port);
});
