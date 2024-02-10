const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users.rt");

const app = express();

app.use(logger("dev")); //Log response status to console
app.use(express.json()); //Parse incoming JSON requests; req.body
app.use(express.urlencoded({ extended: false })); //Parse requests app/x-www-form-urlencoded; req.body
app.use(cookieParser()); //Parse cookies in headers; req.cookies
app.use(express.static(path.join(__dirname, "public"))); //Serve static files from 'public' directory
app.use(cors()); //All CORS Requests

app.use("/auth", usersRouter);

app.use("/", indexRouter);
app.use("/users", usersRouter);
/*
app.get("/posts", postRoutes);
app.get("/posts/:id", postRoutes);
app.post("/posts", postRoutes);
app.delete("/posts/:id", postsRoutes);
app.put("/posts/:id", sauceRoutes);
app.post("/posts/:id/like", likeRoutes); */

module.exports = app;
