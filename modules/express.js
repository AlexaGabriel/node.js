const express = require("express");

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log("rodando");
});
app.get("/home", (req, res) => {
  res.contentType("application/html");
  res.status(200).send("<h1>hello world</h1>");
});
app.get("/users", (req, res) => {
  const users = [
    {
      name: "John Doe",
      email: "john@doe.com",
    },
    {
      name: "Jane Doe",
      email: "jane@doe.com",
    },
  ];
  res.status(200).json(users);
});