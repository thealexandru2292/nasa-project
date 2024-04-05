const express = require('express');

const {
    httpGetAllPlanets,
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets);//removed /planets and added in app.js where app.use('/planets', planetsRouter); and redirect to planets.router.js (here)

module.exports = planetsRouter;