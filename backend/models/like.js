
const mongoose = require('mongoose');

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


const likeSchema = new mongoose.Schema({
  userId:{ type: mongoose.Schema.Types.ObjectId, ref: ' User' },
  cardId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  liked: { type: Boolean, default: false },
});

 // Apply the uniqueValidator plugin to cardSchema.
 likeSchema.plugin(uniqueValidator);

const Like = mongoose.model('Like', likeSchema);


module.exports = Like;
