const http = require('http');

const app = require('./app');

//because th loadPlanetsData of planets.model  is an asyncronous function we have to make sure we load all 100% of planet record before any requests exuted
//so that we make sure we already have plenets before our client web page is has loaded
//the loadPlanetsData will be available for any requests that ever comes in to the server
const {loadPlanetsData} = require('../models/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer(){
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
