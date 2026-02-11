const express = require('express');
const app = express();
const port = 3000;


// Middleware to parse JSON requests
app.use(express.json());



// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
    // Add more books if you'd like!
];

/* Create your REST API here with the following endpoints:
    'GET /api/books': 'Get all books',
    'GET /api/books/:id': 'Get a specific book',
    'POST /api/books': 'Add a new book',
    'PUT /api/books/:id': 'Update a book',
    'DELETE /api/books/:id': 'Delete a book'
*/

//GET ENPOINT
app.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to the Books API",
        endpoints: {
            "GET /books": "Get all books",
            "GET /books/:id": "Get a specific book by ID",
            'POST /api/books': 'Add a new book',
            'PUT /api/books/:id': 'Update a book',
            'DELETE /api/books/:id': 'Delete a book'
        }
    });
});


// GET /books - Return all books
app.get('/books', (req,res) =>{
    res.json(books);
})

// GET /api/books/:id - Retrieve a specific book by ID
app.get('/books/:id', (req,res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(m => m.id === bookId)

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({error: "Book not found"})
    }
})

// POST /api/books: Add a new book
app.post('/books', (req,res) =>{
    // Extract data from request body
    const {title, author, genre, copiesAvailable} = req.body;

    // Create new book with generated ID
    const newBook = {
        id: books.length + 1,
        title,
        author,
        genre,
        copiesAvailable
    };

    //Add to books array
    books.push(newBook);


    //Return the created book with 201 status
    res.status(201).json(newBook)

})

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
  });
}




