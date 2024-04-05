const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,

}

launches.set(launch.flightNumber, launch);

function getAllLaunces(){
    return Array.from(launches.values());
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        //with object.assign we cand overright some or all properties of an object, in this case wee need to set the flightnumber to always be the last number
        Object.assign(launch, {
            /* success|upcoming|customers|flightNumber fields are being set by default by our app, to make the client's life easier */
            success: true, 
            upcoming: true,
            customers: ['Zero To Mastery', 'NASA'],
            flightNumber: latestFlightNumber
        })
    );
}
module.exports = {
    getAllLaunces,
    addNewLaunch,
}