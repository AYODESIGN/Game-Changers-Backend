
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Create a new instance of MongoDBStore
const store = new MongoDBStore({
  uri: 'mongodb+srv://ayoubcj:ayoub92@cluster0.wdlezms.mongodb.net/',
  collection: 'sessions',
});

// Configure your session settings
const sessionConfig = {
  secret: 'ayoub92', // Change to a secure secret key
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};

module.exports = sessionConfig;
