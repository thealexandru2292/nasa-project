/* 
   Because we run the project by pm2 and it splits the requests between the workers or CPU cores, and when creating 
   a new launch and this is stored in Map that means in the CPU memory, there is not 
   guarantee that the launch will be found, when openening upcoming page which might be distributed to another core, 
   as it might use another Cpu core for processing the request which means other memory partiiton

   To make sure we use the same memory partition and storing newly created launches in different cores 
   we will be using a Database, which will act independetly of our servers, and also if the server crashes 
   we keep our data safe. 

   */

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b', // for the planet we are aiming for
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,

}

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId){
    return launches.has(launchId);//the map has key which is flightNumber
}

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

function abortLaunchById(launchId){
    //launches.delete(launchId); //we can delete, but we want this info to be used instead we will abort it
    const aborted = launches.get(launchId);
    aborted.upcoming = false;//we will use this record in our historical list on frontend 
    aborted.success = false;//and will be marked as unseccessful 
    launches.set(launchId, aborted);
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunces,
    addNewLaunch,
    abortLaunchById,
}