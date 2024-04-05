const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('../routes/planets/planets.router');
const launcesRouter = require('../routes/launches/launches.router');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
})); 

app.use(morgan('combined'));
app.use(express.json()); 

// we are serving our assests from client public folder that have been built from client public when running 'npm run deploy' 
//this makes sure we have client and server both on the same port 8000
//THE ISSUE is that we don't manage the routes from client/src/pages/AppLayout.js and we will get errors like: Cannot GET /launch when trying to open http://localhost:8000/launch
//Our React Router() is responsible what to do with the paths of URL that we put in browser and this is happening in public/index.js file that contains the running of react application
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter);
app.use(launcesRouter);
//index.html is responsible to trigger our react framework 
//when running localhost:8000/history and the express server will try to find the static file that is called /history that is served by our static middleware: app.use(express.static(path.join(__dirname, '..', 'public')));
//AND if that doesn't match it tries to match /history endpoint in our api  which doesn't exist
//to solve that we just add * to our BASE PATH / AND it will redirect to index.html THAT WILL MANAGE THAT ROUTE (/history or any other path/route that is managed in client/src/pages/AppLayout router)
//this uses express matches capabilties where the * matches everything that follows the / that matches any endpong THAT ISN'T MATCHED ABOVE
//if the path doesn't match any from above only then it passes further to /* where id redirect to index.html and then react is going to AppLayout
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','public', 'index.html'));
})
 
module.exports = app;

