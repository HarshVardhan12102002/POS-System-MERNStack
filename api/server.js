// git init --y
// npm i express

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 5000;

// routes
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billRoute = require("./routes/bills.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const uploadMedia = require("./routes/upload.js")

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

// Ensure correct route paths without leading slashes
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/upload", uploadMedia);


// app.get("/", (req, res) => res.send("hello world"));

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});
