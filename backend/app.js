const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/", authRoute);

app.listen(3001,() => {
  console.log("http://localhost:3001");
});
