// import mongoose module

const mongoose = require("mongoose");

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


// Create card Schema
const cardSchema = mongoose.Schema({
    number: String,
    gender: String,
    country: String,
    team: String,
    main: String,
    sub: String,
    rank: String,
    name: String,
    top: Number,
    bottom: Number,
    left: Number,
    right: Number,
    description: String,
    img: String,
    collections: String,

});

 // Apply the uniqueValidator plugin to cardSchema.
cardSchema.plugin(uniqueValidator);



// Create Model Name "card"
const card = mongoose.model("Card", cardSchema);

// Make carad Exportable
module.exports = card;