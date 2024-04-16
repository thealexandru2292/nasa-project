const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

function isHabitablePlanet(planet)
{
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData(){
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname,'..','..','server','data','kepler_data.csv'))
        .pipe(parse(
            {
 
                comment: '#',
                columns: true,
            }
        ))
        .on('data', async (data) => {
    
            if(isHabitablePlanet(data))
            {
                savePlanet(data);
            } 
            
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', async () => {
            const countPlanetsFound = (await getAllPlanets()).length;
            console.log(`${countPlanetsFound} habitable planets found`);
            console.log('done');
        })
        resolve();
    });
}

async function savePlanet(planet){
    //updateOne() - is upsert function
    //when third object argument is set to upsert: true then first argument object is filtering the data that needs to be upserted i.e if the planet with the kpler_name exist we update else create
    //when third object argument is not set as upsert: true then we only update the record if we find, else do nothing
    try {
        await planets.updateOne(
            {
                keplerName: planet.kepler_name
            },
                //we create or update with secod argument object
            {
                keplerName: planet.kepler_name
            },
            {
                upsert: true,
            });
    } catch (err) {
        console.log(`Could not save planet ${err}`);
    }
}

async function getAllPlanets(){
    return await planets.find({});
}

module.exports = {
    getAllPlanets,
    loadPlanetsData,
}; 