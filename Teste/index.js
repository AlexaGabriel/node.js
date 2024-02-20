const express = require("express");
const exphbs = require("express-handlebars");
const fs = require("fs"); // Importe o módulo fs
const port = 3000;
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
const usersData = JSON.parse(fs.readFileSync("./public/users.json", "utf-8"));

app.get("/users", (req, res) => {
  res.render("users", { result: usersData }); // Correção aqui
});

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/Pessoa", (req, res) => {
  const newUser = {
    id: usersData.length + 1, // Define o ID do novo usuário como o próximo disponível
    name: req.body.nome, // Pega o nome do formulário
    idade: req.body.idade, // Pega a idade do formulário
  };

  // Adiciona o novo usuário ao array de usuários
  usersData.push(newUser);

  fs.writeFileSync(
    "./public/users.json",
    JSON.stringify(usersData, null, 2),
    "utf-8"
  );

  res.redirect("/users");
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  // Filtra o array de usuários para remover o usuário com o ID fornecido
  usersData = usersData.filter((user) => user.id !== parseInt(id));

  // Escreve os dados atualizados de volta no arquivo JSON
  fs.writeFileSync(
    "./public/users.json",
    JSON.stringify(usersData, null, 2),
    "utf-8"
  );

  res.send("Usuário excluído com sucesso");
});
app.listen(port);
