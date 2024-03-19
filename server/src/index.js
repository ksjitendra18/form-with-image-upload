const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/", userRoutes);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log("App running on ", PORT);
    });
  })
  .catch((err) => {
    console.log("error while connecting to db", err);
  });
