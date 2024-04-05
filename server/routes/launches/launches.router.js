const express = require('express');
const {
    getAllLaunces,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunces);

module.exports = launchesRouter;