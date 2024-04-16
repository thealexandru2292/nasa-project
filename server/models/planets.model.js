const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

const habitablePlanets = [];


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
            /*  TODO: replace create with upsert
                await planets.create({
                    keplerName: data.kepler_name
                }); *///this will be saved as planet object on a new document that will be stored in planets collection in mongoDB
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

async function getAllPlanets(){
    return await planets.find({
       //if we pass an empty object all documents will be returned
       //if we pass keplerName: 'Kepler-62 f', only planets matchign this name will be returned
    }//,
    //{
        /* our find() method takes an second argument also an object which is an projection, 
           the list of fields that you would like to include in the list
        */
      // 'keplerName': 1, //this will show the kepler name field, if 0 mongo will exclude this 
                        //or we can just use instead of this object, a list of fields separated by space as a string 'keplerName antotherField'
                        //and if we would like to exlcude keplerName and only add anotherField we add - simbol in front of the field we want to exclude
                        // '-keplerName antotherField' 

                        // find more about find() here : https://mongoosejs.com/docs/api/model.html#Model.find()
                       // User.find({ age: { $gte: 21, $lte: 65 } });
                       //$gte - greater than or equal to
                       //$lte - less than or equal to
                       
                       // executes, name LIKE john and only selecting the "name" and "friends" fields
                       //await MyModel.find({ name: /john/i }, 'name friends').exec();

    //}
    );
}

module.exports = {
    getAllPlanets,
    loadPlanetsData,
}; 