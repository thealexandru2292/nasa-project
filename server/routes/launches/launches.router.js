const express = require('express');
const {
    httpGetAllLaunces,
    httpAddNewLaunch,
    httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

//removed /launches from here and added to app.js app.use('/launches',launcesRouter);
//and here we will only use / and if we want to be more specific and not repead ourelves we can go further with /incoming or /:id 
launchesRouter.get('/', httpGetAllLaunces);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;