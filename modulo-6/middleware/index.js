const express = require("express");
const port = 3000;
const app = express();
const path = require("path");

const basePath = path.join(__dirname, "templates");

const checkAuth = function (req, res, next) {
  req.authStatus = true;
  if (req.authStatus == true) {
    console.log("está logado");
    next();
  } else {
    console.log("não está logado");
    next();
  }
};
app.use(checkAuth);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(`estamos buscando pelo usuário: ${id}`);
  res.sendFile(`${basePath}/users.html`);
});

app.listen(port, () => {
  console.log(`app rodando na porta ${port}`);
});
