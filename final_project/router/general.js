const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post('/register', function (req, res) {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    
    if (users[username]) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Store user information
    users.push({ username, password });

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    const bookList = Object.values(books);

    if (bookList.length > 0) {
        res.status(200).json(bookList);
    } else {
        res.status(404).json({ message: "No books available" });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
  getBook
    .then(() => console.log('Promise for Task 11 resolved'))
    .catch(() => console.log('Promise for Task 11 rejected'));
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();
    const booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author);

    if (booksByAuthor.length > 0) {
        res.status(200).json(booksByAuthor);
    } else {
        res.status(404).json({ message: "Books by this author not found" });
    }
  getBooks
    .then(() => console.log('Promise for Task 12 resolved'))
    .catch(() => console.log('Promise for Task 12 rejected'));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const bookDetails = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase());

    if (bookDetails.length > 0) {
        res.status(200).json(bookDetails);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
  getBooks
    .then(() => console.log('Promise for Task 13 resolved'))
    .catch(() => console.log('Promise for Task 13 rejected'));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book && book.reviews) {
        res.status(200).json(book.reviews);
    } else {
        res.status(404).json({ message: "Book not found or no reviews available" });
    }
});

module.exports.general = public_users;
