const http = require('http');//built in node
//this HTTP allows us to use web sockets to use for real-time communication as opposed to sending requests and waiting for response
const app = require('./app'); // we can see that express is just middleware that we add on top of build in HTTP server
const PORT = process.env.PORT || 8000;
// "start": "PORT=5000 node src/server.js",  this line should be se in the package.js if we want to set a different port
// we can change the port directly from server.js and the server.js will use this if it is assigned as "const PORT = process.env.PORT || 8000;"

// express is fancy listener function for our build in node http server
const server = http.createServer(/* something to listen */ app);
//the listen function that we get from express that we call on app is exactly the same as the listen function we call server object
//we can use either of them to use our express server
//the little benefit of this is that we now can organize a little bit more of code by separating server functionality that we have in this file from our express code 
//which we are going to put into a new file app.js there will we have all of our express code. 
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

