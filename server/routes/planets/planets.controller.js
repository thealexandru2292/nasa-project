const {getAllPlanets} = require('../../models/planets.model');

function httpGetAllPlanets(req, res)
{
   return res.status(200).json(getAllPlanets()); 
   //with return we make sure the response is provided only once, and headers are also being already set
}

module.exports = {
    httpGetAllPlanets
}