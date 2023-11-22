const session = require('express-session');

// Configure your session settings
const sessionConfig = {
  secret: 'ayoub92', // Change to a secure secret key
  resave: false,
  saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
};



module.exports = sessionConfig;
