const {getAllLaunces} = require('../../models/launches.model');

function httpGetAllLaunces(req, res) {
    return res.status(200).json(getAllLaunces()); 
}

module.exports = {
    httpGetAllLaunces,
}