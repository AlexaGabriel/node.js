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
  const description = req.body.description;

  const query = "INSERT INTO books (title, page, description) VALUES (?, ?, ?)";
  conect.query(query, [title, page, description], function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro ao inserir livro");
    }

    res.redirect("/books");
  });
});
app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  conect.query(query, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro ao buscar livros");
    }

    console.log(result);
    res.render("books", { books: result });
  });
});
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM books WHERE id = ${id}`;
  conect.query(query, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro ao buscar o livro");
    }
    const book = result[0];
    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM books WHERE id = ${id}`;
  conect.query(query, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro ao buscar o livro");
    }
    const book = result[0];
    res.render("editbook", { book });
  });
});
app.post("/books/update", function (req, res) {
  const id = req.body.id;
  const title = req.body.title;
  const page = req.body.page;
  const description = req.body.description;

  const query =
    "UPDATE books SET title = ?, page = ?, description = ? WHERE id = ?";
  conect.query(query, [title, page, description, id], function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro ao editar livro");
    }
    res.redirect("/books");
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
