const {
    getAllLaunces,
    addNewLaunch,
    existsLaunchWithId,
} = require('../../models/launches.model');

function httpGetAllLaunces(req, res) {
    return res.status(200).json(getAllLaunces()); 
}

function httpAddNewLaunch(req, res){
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);

    if(isNaN(launch.launchDate)){ //new Date() converts the string from post to a number the time from January 1971 , and if this is not a number it means is not a valid date
    //or 
    //if(launch.launchDate === 'Invalid Date') both work equally well.
        return res.status(400).json({
            error: 'Invalid Launch Date',
        });
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res){
    const launchid = req.params.id;
   
    if(!existsLaunchWithId(launchid)){
        return res.status(404).json({
            error: 'Launch not found',
        })
    }else{
        return res.status(200).json(aborted);
    }
}
    

module.exports = {
    httpGetAllLaunces,
    httpAddNewLaunch,
    httpAbortLaunch,
}