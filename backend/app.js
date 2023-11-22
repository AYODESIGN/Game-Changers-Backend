// import express module
const express = require("express");
// import jwt module
const jwt = require('jsonwebtoken');
// import express-session module
const session = require('express-session');
const cors = require('cors');
const path = require("path");
const bcrypt = require("bcrypt");
const secretKey = require('./config/session');




// import mongoose module
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use("/myFiles", express.static(path.join("backend/files")));

// Import configuration files from the config folder
const databaseConfig = require('./config/database');
const multerConfig = require('./config/multer');
const sessionConfig = require('./config/session');

// Connect to MongoDB using the configuration from database.js
// mongoose.connect(databaseConfig.DB_URI, databaseConfig.options)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     console.error('Error connecting to MongoDB:', err);
//   });

const DB_URI = 'mongodb+srv://ayoubcj:ayoub92@cluster0.wdlezms.mongodb.net/';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

 //ayoubcj:<password>@cluster0.wdlezms.mongodb.net/

// Models Importation



// Import route files
const userRoutes = require('./routes/userRoutes'); // Specify the correct path to userRoutes.js
const cardRoutes = require('./routes/cardRoutes'); // Specify the correct path to cardRoutes.js
const likeRoutes = require('./routes/likeRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

// Application Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your session configuration
app.use(session(sessionConfig));

// Use your multer configuration
const storageConfig = multerConfig.storage;
const MIME_TYPE = multerConfig.MIME_TYPE;

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// Middleware to check JWT token in headers
// app.use((req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     // Remove 'Bearer ' to get the token
//     const cleanToken = token.replace('Bearer ', '');
//     jwt.verify(cleanToken, secretKey.secret, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       } else {
//         // Token is valid; you can access the user data in `decoded` here
//         req.user = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// });

// // Your protected route
// app.get('/add-card', (req, res) => {
//   res.json({ message: 'Protected route accessed successfully' });
// });

// Use the user and card routes
app.use('/api/users', userRoutes);
app.use('/api/card', cardRoutes); // Add requireAuth middleware to cardRoutes
app.use('/api/like', likeRoutes);
app.use('/api/rating', ratingRoutes);

module.exports = app;
