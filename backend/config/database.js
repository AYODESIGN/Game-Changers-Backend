module.exports = {
    DB_URI: 'mongodb://127.0.0.1:27017/gameChangersDB',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  };
  

  // const DB_URI = 'mongodb+srv://xetradepot:artex92@cluster0.l7w3zgd.mongodb.net/';

// mongoose.connect(DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('Connected to MongoDB Atlas');
// })
// .catch(err => {
//   console.error('Error connecting to MongoDB Atlas:', err);
// });