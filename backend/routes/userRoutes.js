const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer');
const secretKey = require('../config/session')
const storageConfig = multerConfig.storage;
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const smtpTransport = require('../utils/nodemailer');



// Business Logic: User signup
router.post("/signup/user", multerConfig.storage.fields([{ name: "img", maxCount: 1 }]), async (req, res) => {
  console.log("Here into Signup User", req.body);

  try {
      const cryptedPwd = await bcrypt.hash(req.body.pwd, 10);
      console.log("Here crypted Pwd", cryptedPwd);
      req.body.pwd = cryptedPwd;

      const image = req.files["img"][0];

      req.body.img = `${req.protocol}://${req.get("host")}/myFiles/${image.filename}`;

      let user = new User(req.body);
      await user.save();
      console.log("Success", user);

      // Send a confirmation email
    //  const mailOptions = {
      //    from: process.env.EMAIL_USER, // Sender's email address
       //   to: user.email, // User's email
        //  subject: 'Confirmation Email',
        //  text: 'Thank you for signing up!'
          // Add any email content or HTML template here
    //  };
     
     
      // smtpTransport.sendMail(mailOptions, (error, info) => {
      //     if (error) {
      //         console.log('Email sending error:', error);
      //     } else {
      //         console.log('Email sent: ' + info.response);
      //     }
      // });

      res.json({ msg: "Added with success" });
  } catch (error) {
      console.error("Here Error", error);
      res.json({ msg: "Error" });
  }
});

  // Business Logic: User login
  router.post("/login", (req, res) => {
    console.log("Here Into BL login", req.body);
  
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          console.log("User not found");
          res.json({ msg: "Please check Email" });
        } else {
          bcrypt.compare(req.body.pwd, user.pwd, (err, isEqual) => {
            if (err) {
              console.log("Error comparing passwords:", err);
              res.json({ msg: "An error occurred" });
            } else if (isEqual) {
              console.log("Passwords match");
              let userToSend = {
                userId: user._id,
                email: user.email,
                phone: user.phone,
                address: user.address,
                img: user.img,
                openSea: user.openSea,
                twitter: user.twitter, 
                wallet: user.wallet,              
                role: user.role,
                username: user.username
              };
  
              const token = jwt.sign(userToSend, secretKey.secret, {
                expiresIn: "1h"
              });
              res.json({ user: token, role: user.role, msg: "2" });
            } else {
              console.log("Passwords do not match");
              res.json({ msg: "Please check Password" });
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ msg: "An error occurred" });
      });
  });
  
  // Business Logic: Get all users
router.get("", async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "An error occurred" });
  }
});

// Business Logic: Get user by ID
router.get("/users/:id", async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({ msg: "User not found" });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "An error occurred" });
  }
});
// Business Logic: Delete user by ID
router.delete("/users/:id", async (req, res) => {
  try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (user) {
          res.json({ msg: "User deleted with success" });
      } else {
          res.status(404).json({ msg: "User not found" });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "An error occurred" });
  }
});


// Business Logic: Edit User
router.post('/edit', multerConfig.storage.fields([{ name: 'img', maxCount: 1 }]), async (req, res) => {
  try {
    const userId = req.body.userId;

    // Check if 'img' exists in req.files and is an array
    if (req.files && Array.isArray(req.files['img']) && req.files['img'].length > 0) {
      const image = req.files['img'][0];
      req.body.img = `${req.protocol}://${req.get('host')}/myFiles/${image.filename}`;
    }

    // Update the existing user
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    console.log('Success', updatedUser);

    // Generate a new token with updated user information
    const newToken = generateToken(updatedUser);

    // Send the new token and updated user information in the response
    res.json({ msg: 'User updated with success', updatedUser, newToken });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


// Function to generate a new token
function generateToken(user) {
  // Customize this method based on how you create tokens in your application
  let userToSend = {
    userId: user._id,
    email: user.email,
    phone: user.phone,
    address: user.address,
    img: user.img,
    openSea: user.openSea,
    twitter: user.twitter, 
    wallet: user.wallet,              
    role: user.role,
    username: user.username
  };

  // Generate and return the new token
  return jwt.sign(userToSend, secretKey.secret, {
    expiresIn: '1h'
  });
}


  module.exports = router;

  