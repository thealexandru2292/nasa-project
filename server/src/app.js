//using the app.js as a middleware for our src/server.js
const express = require('express');//a framework for working with node
const cors = require('cors');
const planetsRouter = require('../routes/planets/planets.router');

//we need to set Access-Control-Allow-Origin to allow only the requests (cross origin requests) from sites we trust in our case our front-end client http://localhost:3000
// npm install cors | cors will help us to se a middleware for our requests
//CORS is going to apply to all of our requests, all of them will follow the same cros-origin-behavior 
const app = express();
//we will only acces requests from localhost:3000 which is the origin from our front-end client
app.use(cors({
    //we can also add dyanmic whitelist cros origin sites see here: https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin
    origin: 'http://localhost:3000'
})); 
app.use(express.json()); //parsing incoming json from the body of incoming request
//we separated express middleware from server.js functions to organize our code better
app.use(planetsRouter);
 
module.exports = app;
