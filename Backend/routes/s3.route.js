const express = require('express');
const controller = require('../controller/s3.controller');

const Route = express.Router();

Route.post('/',controller);

module.exports = Route;
