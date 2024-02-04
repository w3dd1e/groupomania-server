const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Allow requests from any origin, set headers and methods allowed for request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("/auth", userRoutes);
app.get("/posts", postRoutes);
app.get("/posts/:id", postRoutes);
app.post("/posts", postRoutes);
app.delete("/posts/:id", postsRoutes);
app.put("/posts/:id", sauceRoutes);
app.post("/posts/:id/like", likeRoutes);

module.exports = app;
