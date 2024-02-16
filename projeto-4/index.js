const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;
const hbs = exphbs.create({
  partialsDir: ["views/partials/"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.get("/", function (req, res) {
  const produts = [
    {
      title: "melancia",
      preco: 16.5,
      rota: "/melancia",
    },
    {
      title: "abobora",
      preco: 30.5,
      rota: "/abobora",
    },
    {
      title: "melão",
      preco: 9.5,
      comments: 5,
    },
  ];

  res.render("loja", { produts });
});

app.get("/melancia", (req, res) => {
  res.render("melancia");
});
app.get("/abobora", (req, res) => {
  res.render("abobora");
});

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
