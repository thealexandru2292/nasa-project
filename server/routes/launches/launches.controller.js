const {launches} = require('../../models/launches.model');

function getAllLaunces(req, res) {
    return res.status(200).json(Array.from(launches.values())); 
}

module.exports = {
    getAllLaunces,
}