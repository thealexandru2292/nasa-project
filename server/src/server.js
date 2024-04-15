const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const {loadPlanetsData} = require('../models/planets.model');
const { error } = require('console');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:s84WQ7fcfxtkcw-Z@nasacluster.3vxiohd.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MondoDB connetion ready!');
})


mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function startServer(){

    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
