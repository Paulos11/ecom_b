const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use("/api", router);
connectDB().then(
  app.listen(PORT, () => {
    console.log("Server is runnin on", PORT);
  })
);
