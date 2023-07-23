const express = require('express');
const controller = require('../controller/cloud.controller');


const Route = express.Router();

Route.post('/',controller);

module.exports = Route;
