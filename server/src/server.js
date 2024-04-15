const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const {loadPlanetsData} = require('../models/planets.model');
const { error } = require('console');

const PORT = process.env.PORT || 8000;

//Mongo DB connecting link from the site: mongodb+srv://nasa-api:<password>@nasacluster.3vxiohd.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster 
 //where before ? in this mongodb.net/?retryWrites=true we need to specify the name of the DB we want to use, if the DB doesn't exist yet, it will be automatically created
 //mongodb.net/nasa?retryWrites=true - now we named our DB as nasa

const MONGO_URL = 'mongodb+srv://nasa-api:s84WQ7fcfxtkcw-Z@nasacluster.3vxiohd.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster';

const server = http.createServer(app);

//event emmitter that confirm the connection is set or there are some errors
//we can call evebts by on() or once() if we want the event to be executed only once.
mongoose.connection.once('open', () => {
    console.log('MondoDB connetion ready!');
})

//error - corespond to the name event of mongoDB
mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function startServer(){
    //pretty much every time when connecting mongoose we will pass in 4 paramters 
    //otherwise we will be notified that that is not reccomended
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
