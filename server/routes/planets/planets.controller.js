const {getAllPlanets} = require('../../models/planets.model');

async function httpGetAllPlanets(req, res)
{
   return res.status(200).json(await getAllPlanets()); 
   //with return we make sure the response is provided only once, and headers are also being already set
}

module.exports = {
    httpGetAllPlanets
}