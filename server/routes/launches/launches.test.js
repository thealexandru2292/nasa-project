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
    test('It should respond with 200 success', () => {
      
    })

    test('It should catch missing required propoerties', () => {});
    
    test('It should catch invalid dates', () => {});
});

