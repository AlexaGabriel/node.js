const express = require("express");
const exphbs = require("express-handlebars");
const conect = require("./db/conect");
const User = require("./models/User");
const adress = require("./models/adress");
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

app.get("/", async (req, res) => {
  const user = await User.findAll({ raw: true });
  console.log(user);
  res.render("home", { User: user });
});
app.get("/user/add", (req, res) => {
  res.render("adduser");
});
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });
  res.render("userview", { user });
});
app.post("/user/add", async (req, res) => {
  const name = req.body.name;
  const ocupations = req.body.ocupations;
  let newsletter = req.body.newsletter;

  if (newsletter == "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }
  console.log(req.body);
  await User.create({ name, ocupations, newsletter });
  res.redirect("/");
});
app.post("/user/delet/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.redirect("/");
});
app.get("/user/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ include: adress, where: { id: id } });
  res.render("useredit", { user: user.get({ plain: true }) });
});
app.post("/user/update", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const ocupations = req.body.ocupations;
  let newsletter = req.body.newsletter;
  if (newsletter == "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }
  const userdata = {
    id,
    name,
    ocupations,
    newsletter,
  };
  await User.update(userdata, { where: { id: id } });
  res.redirect("/");
});
app.post("/adress/create", async (req, res) => {
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;
  const Adress = {
    street,
    number,
    city,
    UserId,
  };
  await adress.create(Adress);
  res.redirect(`/user/edit/${UserId}`);
});

conect
  .sync()
  //.sync({ force: true })
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
