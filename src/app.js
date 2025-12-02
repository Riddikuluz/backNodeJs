const index = require("./index");
const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

app.use("/", index);

module.exports = app;
