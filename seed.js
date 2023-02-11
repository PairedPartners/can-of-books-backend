'use strict'

const mongoose = require('mongoose');
require('dotenv').config();

// Making Connection to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL);

// Bringing in our Model
const Book = require('./models/books');

// Function seeds data into our database
async function seed() {

  //First way to save to database using .save, 
  // Required to create a new model then run save() to save to database
  const myBook = new Book({
    title: 'The Very Secret Society of Irregular Witches',
    description: `As one of the few witches in Britain, Mika Moon knows she has to hide her magic, keep her head down, and stay away from other witches so their powers don’t mingle and draw attention. And as an orphan who lost her parents at a young age and was raised by strangers, she’s used to being alone and she follows the rules...with one exception: an online account, where she posts videos "pretending" to be a witch. She thinks no one will take it seriously.
 
    But someone does. An unexpected message arrives, begging her to travel to the remote and mysterious Nowhere House to teach three young witches how to control their magic. It breaks all of the rules, but Mika goes anyway, and is immediately tangled up in the lives and secrets of not only her three charges, but also an absent archaeologist, a retired actor, two long-suffering caretakers, and…Jamie. The handsome and prickly librarian of Nowhere House would do anything to protect the children, and as far as he’s concerned, a stranger like Mika is a threat. An irritatingly appealing threat.
     
    As Mika begins to find her place at Nowhere House, the thought of belonging somewhere begins to feel like a real possibility. But magic isn't the only danger in the world, and when peril comes knocking at their door, Mika will need to decide whether to risk everything to protect a found family she didn’t know she was looking for....`,
    status: 'Read' 
  })
  await myBook.save()
    .then(response => console.log('Saved Solo to Database'))
    .catch(err => console.error(err));

  // Alternate method .create()
  await Book.create({
    title: 'The Name of The Wind',
  description: `My name is Kvothe.

  I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.
  
  You may have heard of me.
   
  So begins a tale unequaled in fantasy literature—the story of a hero told in his own voice. It is a tale of sorrow, a tale of survival, a tale of one man’s search for meaning in his universe, and how that search, and the indomitable will that drove it, gave birth to a legend.`,
  status: 'Read' 
  })
  .then(response => console.log('Saved Luna to Database'))
  .catch(err => console.error(err));

  // Disconnecting from Database
  mongoose.disconnect();

}

// Runs function when file is ran with *node seed.js*
seed();