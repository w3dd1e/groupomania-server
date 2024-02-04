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

app.use("/api/auth", userRoutes);
app.get("/api/sauces", sauceRoutes);
app.get("/api/sauces/:id", sauceRoutes);
app.post("/api/sauces", sauceRoutes);
app.delete("/api/sauces/:id", sauceRoutes);
app.put("/api/sauces/:id", sauceRoutes);
app.post("/api/sauces/:id/like", likeRoutes);

module.exports = app;
