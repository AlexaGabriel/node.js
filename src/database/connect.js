const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.Mongo_user}:${process.env.Mongo_pass}@nodejscourse.zw2avqm.mongodb.net/?retryWrites=true&w=majority`,
    (error) => {
      if (error) {
        console.log("ocorreu um erro");
      }
    }
  );
};
module.exports = connectToDatabase;
