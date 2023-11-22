
const mongoose = require('mongoose');

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


const ratingSchema = new mongoose.Schema({
  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cardId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  rating: { type: Number, required: true,},
});

 // Apply the uniqueValidator plugin to cardSchema.
 ratingSchema.plugin(uniqueValidator);

const Rating = mongoose.model('Rating', ratingSchema);


module.exports = Rating;
