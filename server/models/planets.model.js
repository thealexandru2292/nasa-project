const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];


function isHabitablePlanet(planet)
{
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

/* 
const promise = new Promise((resolve, reject) => {
    resolve(42); 
});
//42 is passes in (result) => {}
promise.then((result) => {

})

const result = await promise;
*/

//we return a promise which resolves which habital planets have been found
//and we will wait for that promise to resolve before listening to requests in our server
function loadPlanetsData(){
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname,'..','..','server','data','kepler_data.csv'))
            //connect parse() with fs together by pipe()
            //it transform data from stream (0101) to bytes data (text)
        .pipe(parse(
            {
                //dependign on who wrote the csv file put the comment sign and we need to indicate which character is the commented line
                comment: '#',
                columns: true,//set columns as key=>value pairs
            }
        ))
        .on('data', (data) => {
    
            if(isHabitablePlanet(data))
            {
                habitablePlanets.push(data);
            }
            
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
          
            console.log(`${habitablePlanets.length} habitable planets found`);
            console.log('done');
        })
        resolve();
    });
}

function getAllPlanets(){
    return habitablePlanets;
}

module.exports = {
    getAllPlanets,
    loadPlanetsData,
}; 