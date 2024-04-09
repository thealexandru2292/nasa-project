//installed npm supertest --save-dev to perform call test agaings api 
//we need to rquire the tool that makes request against api
const request = require('supertest');
//because request(); requires app as parameter we we will require our app.js 
const app = require('../../src/app');

describe('Test GET /launches', () => {
    test('It Should respond with 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    })
});

describe('Test POST /launche', () => {
    test('It should respond with 200 success', () => {
      
    })
});

describe('Test POST /launche', () => {
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'Jannuary 4, 2028',
    }

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
    }


    test('It should respond with 201 success', async () => {
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

        //using JEST expect // take a look at doccumentation: https://jestjs.io/docs/expect#tomatchobjectobject
        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(launchDataWithoutDate)
    })

    test('It should catch missing required propoerties', () => {});
    
    test('It should catch invalid dates', () => {});
});

