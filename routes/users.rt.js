const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users.ctrl');

//Route request to login and signup controllers
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
