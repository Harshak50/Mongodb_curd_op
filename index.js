const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./Routes/user");

var app = express();
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const con = mongoose.connection;

app.use(express.json());
try {
  con.once("open", () => {
    console.log("Connected to Database Successfully");
  });
} catch (error) {
  console.log("Error while connecting to db: " + error);
}

app.use('/users', usersRouter);

const port = 9000;
app.listen(port, () => {
  console.log("Server running up and healthy");
});
