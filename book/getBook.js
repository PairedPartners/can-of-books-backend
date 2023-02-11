'use strict'

const Book = require('../models/books');

function getBooks(req, res, next){
  //Q object is empty to get everything
  let queryObject={};
  Book.find(queryObject)
  .then(data => res.status(200).send(data))
  .catch(err => console.error(err));

};

module.exports = getBooks;