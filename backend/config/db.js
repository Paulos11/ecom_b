const moongose = require("mongoose");

const connectDB = async () => {
  try {
    await moongose.connect(process.env.MONGO_URL);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
