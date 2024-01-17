const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@nodejscourse.zw2avqm.mongodb.net/`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(console.log("Conexão efetuada com sucesso!"))
    .catch((error) => {
      console.log("Ocorreu um erro ao realizar a conexão! Erro: ", error);
    });
};
module.exports = connectToDatabase;
