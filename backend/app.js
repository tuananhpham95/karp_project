const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
mongoose.connect(process.env.MONGODB_URL);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit:"50mb",extended: true }));
app.use(bodyParser.json({limit:"50mb"}));


app.use("/", authRoute);

app.listen(3001,() => {
  console.log("http://localhost:3001");
});
