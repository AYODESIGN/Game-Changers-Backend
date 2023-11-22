const session = require('express-session');

// Configure your session settings
const sessionConfig = {
  secret: 'ayoub92', // Change to a secure secret key
  resave: false,
  saveUninitialized: true,
  // You can customize other session options as needed
};

module.exports = sessionConfig;
