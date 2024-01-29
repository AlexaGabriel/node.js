const express = require("express");
const UserModel = require("../src/models/user.models");

const app = express();
const port = 8080;
app.use(express.json());

app.listen(port, () => {
  console.log("rodando");
});
app.get("/home", (req, res) => {
  res.contentType("application/html");
  res.status(200).send("<h1>hello world</h1>");
});
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(201).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body); // Use await para aguardar a conclusão
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
