'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const verifyUser = require('./authorize');
const {bookHandler} = require('./modules/bookHandler');

const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(verifyUser);

const PORT = process.env.PORT || 3002;


// Establish connection with atlas db with our url
mongoose.connect(process.env.MONGODB_URL);

// assigning connection to variable to easily access connection methods
const db = mongoose.connection;

// listener for error
db.on('error', console.error.bind(console, 'connection error'));

// runs on 'open' will console log connected
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (req, res) => res.status(200).send('Default Route Working'));

// Route that runs our getBooks function that was imported in
app.get('/books', bookHandler.getBooks);

// Route that posts a new book to our database
app.post('/books', bookHandler.postBooks);

// Route that deletes a new book to our database
app.delete('/books/:id', bookHandler.deleteBooks);

// Route that updates a book by ID
app.put('/books/:id', bookHandler.putBook);

app.get('/test', (request, response) => {

  response.send('test request received');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));