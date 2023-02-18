'use strict'

const Book = require('../models/books');

const bookHandler = {};

// Book Getter
bookHandler.getBooks = function(req, res, next){
  //Q object is empty to get everything
  let queryObject={};
  Book.find(queryObject)
  .then(data => res.status(200).send(data))
  .catch(err => console.error(err));
}

// Book Poster
// Newer async way to handle this
// async function postBooks(req, res, next){
//   let body = req.body;
//   console.log(body)
//   try{
//     let newBook = await Book.create(body);
//     console.log(newBook);
//     res.status(200).send(newBook);
//   }
//   catch(e){
//     res.status(500).send(e);
//   }
// }
bookHandler.postBooks = function(req, res, next){
  // Storing our data in a variable 
  const data = req.body;
   Book.create(data)
  //  console.log(data)
   .then(createdBook => {
    console.log(createdBook)
    return res.status(200).send(createdBook)
  })
  //  console.log(createdBook)
   .catch(err => next(err));
}

// Book Deleter
bookHandler.deleteBooks = function(req, res, next){
  const id = req.params.id;
  Book.findByIdAndDelete(id)
  .then(deletedBook => res.status(200).send(deletedBook))
  .catch(err => next(err));
}

bookHandler.putBook = function(req, res, next){
  const id = req.params.id;
   // grabbing json data from request body
   const data = req.body;
   // new - returns updated doc instead of old
   // overwrite - overwrites data completely avoiding unwanted side effects
  Book.findByIdAndUpdate(id, data, {new: true, overwrite: true})
  .then(updatedBook => res.status(200).send(updatedBook))
  .catch(err => next(err));
}

module.exports = {bookHandler};