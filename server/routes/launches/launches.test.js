// we can create test files like this or like launches.spec.js or creating a folder __tests__ in serrver folder
// this will include tests for our launches endpoints
//the describe() function is not a JS or Node function it is Jest function that runs whenm we type: "npm test" from server folder
describe('Test GET /launches', () => {
    test('It Should respond with 200 success', () => {
        const response = 200;
        expect(response).toBe(200);
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

