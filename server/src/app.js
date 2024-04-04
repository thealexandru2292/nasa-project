const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');//used for loggin information from client request

const planetsRouter = require('../routes/planets/planets.router');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
})); 

app.use(morgan('combined'));// this will output/log all HTPP request information like get/post/put 
app.use(express.json()); 

//as part of our middleware will use another express built-in middleware to serve all of our public files
app.use(express.static(path.join(__dirname, '..', 'public')));//we will serve our public folder

app.use(planetsRouter);
//this get sends the index.html file to the / route address (on home page) 
//the entire public folder which is the frontend client project is generted by running the 'npm run build' from nasa-project folder, alternatively we can mannualy copy paste the public folder from client to server
//in this way we don't need to run separately the client then the server on different ports client from 3000 and server from port 8000 but both from the same port 8000
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..','public', 'index.html'));
})
 
module.exports = app;

