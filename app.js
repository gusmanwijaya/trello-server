const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const todosRouter = require("./routes/todos");
const itemsRouter = require("./routes/items");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const API = "api";

app.use(`/${API}/todos`, todosRouter);
app.use(`/${API}/items`, itemsRouter);

module.exports = app;
