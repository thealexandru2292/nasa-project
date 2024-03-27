const express = require('express');//a framework for working with node
const app = express();
app.use(express.json()); //parsing incoming json from the body of incoming request
//we separated express middleware from server.js functions to organize our code better
module.exports = app;