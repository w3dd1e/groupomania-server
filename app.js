const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users.rt');
const postsRouter = require('./routes/posts.rt');
const profileRouter = require('./routes/profiles.rt');

const app = express();

app.use(logger('dev')); //Log response status to console
app.use(express.json({ limit: '50mb' })); //Parse incoming JSON requests; req.body
app.use(express.urlencoded({ limit: '50mb', extended: false })); //Parse requests app/x-www-form-urlencoded; req.body
app.use(cookieParser()); //Parse cookies in headers; req.cookies
app.use(express.static(path.join(__dirname, 'public'))); //Serve static files from 'public' directory
app.use(cors()); //All CORS Requests

app.use('public/images', express.static(path.join(__dirname, 'public/images')));

app.use('/auth', usersRouter);

app.use('/users', usersRouter);

app.get('/posts', postsRouter);
app.get('/posts/:id', postsRouter);
app.post('/posts', postsRouter);
app.delete('/posts/:id', postsRouter);
app.put('/posts/:id', postsRouter);

app.get('/profile/:id', profileRouter);
app.put('/profile/:id', profileRouter);
app.delete('/profile/:id', profileRouter);

/**
 * FEATURE TO BE INCLUDED IN FUTURE VERSION OF APP
 * app.post("/posts/:id/like", likeRoutes);
 */
module.exports = app;
