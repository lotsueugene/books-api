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


describe('Book API | POST', ()=> {
test('should create a new book', async () => {
    const newBook = {
        title: "Inception",
        author: "Eugene Lotsu",
        genre: 'Fiction',
        copiesAvailable: 10
    };

    const response = await request(app)
        .post('/books')
        .send(newBook);
  
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Inception');
});

});



describe('Book API | PUT', ()=>{
    test('should update existing book', async () => {
    const updatedBook =  {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 0
    };

    const response = await request(app)
        .put('/books/1')
        .send(updatedBook);
  
    expect(response.status).toBe(200);
    expect(response.body.genre).toBe('Fiction');
});

});