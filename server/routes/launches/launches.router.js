const express = require('express');
const {
    httpGetAllLaunces,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunces);

module.exports = launchesRouter;