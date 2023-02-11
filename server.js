'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const getBooks = require('./book/getBook');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// Establish connection with atlas db with our url
mongoose.connect(process.env.MONGODB_URL);

// assigning connection to variable to easily access connection methods
const db = mongoose.connection;

// listener for error
db.on('error', console.error.bind(console, 'connection error'));

// runs on 'open' will console log connected
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (req, res) => res.status(200).send('Default Route Working'));

app.get('/test', (request, response) => {

  response.send('test request received');
})

app.get('/books', getBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
