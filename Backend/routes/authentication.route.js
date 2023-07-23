const express = require('express');
const controller = require('../controller/authentication.controller');

const authRoute = express.Router();

authRoute.post('/signup',controller.singUpUser);

authRoute.post('/signin',controller.loginUser);

authRoute.post('/glogin',controller.glogin);

module.exports = authRoute;
