// In the tests/api.test.js file, write Jest tests using Supertest that verify:

// GET endpoints return correct data and status codes
// POST endpoints create new resources properly
// PUT endpoints update existing resources correctly
// DELETE endpoints remove resources successfully
// Error cases return appropriate 404 status codes


const request = require('supertest');
const app = require('../server'); 

describe('Book API| GET ENDPOINTS', () => {
    test('should return all books', async () => {
    const response = await request(app).get('/books');

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(3); 
    });

    test('should return books by ID', async () => {
    const response = await request(app).get('/books/1');
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('title');
});

    test('should return book by ID', async () => {
    const response = await request(app).get('/books/999');
  
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
});

});


