const planets = require('../../models/planets.model');

function getAllPlanets(req, res)
{
   return res.status(200).json(planets); 
   //with return we make sure the response is provided only once, and headers are also being already set
}

module.exports = {
    getAllPlanets
}