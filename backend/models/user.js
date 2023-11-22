// import mongoose module

const mongoose = require("mongoose");

// import mongoose validaitor
const uniqueValidator = require('mongoose-unique-validator');


// Create user Schema
const userSchema = mongoose.Schema({
  username: String,
  // lastName: String,
  email: {type: String, unique: true},
  pwd: String,
  address: String,
  phone: {type: String, unique: true},
  img: String,
  role: String,
  openSea: String,
  twitter: String,
  wallet: String,

});

 // Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);



// Create Model Name "user"
const user = mongoose.model("User", userSchema);

// Make user Exportable
module.exports = user;