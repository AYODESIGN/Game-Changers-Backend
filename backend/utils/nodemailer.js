const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path'); // Import the path module

// Set the path to your .env file
const envPath = path.resolve(__dirname, '../.env'); // Adjust the path as needed

dotenv.config({ path: envPath }); // Load environment variables from the specified path

var smtpTransport = nodemailer.createTransport({
    host: 'smtp.zoho.com', // Zoho's SMTP server
  port: 465, // Zoho's SMTP port for SSL
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});



module.exports = smtpTransport;
