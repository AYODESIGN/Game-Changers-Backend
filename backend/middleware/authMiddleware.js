const jwt = require('jsonwebtoken');
const secretKey = require('../config/session');

const requireAuth = (req, res, next) => {
  const token = req.body.jwt;

  if (token) {
    jwt.verify(token, secretKey.secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // Send a redirect response to the frontend
        res.redirect(302, 'http://localhost:4200/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    // Send a redirect response to the frontend
    res.redirect(302, 'http://localhost:4200/login');
  }
};

module.exports = { requireAuth };
