const express = require('express');
const router = express.Router();
const Like = require('../models/like');
// Add a like for a card
router.post('/', async (req, res) => {
  const cardId = req.body.cardId;
  const userId = req.body.userId; // You can use authentication middleware to get the user ID
  // Check if the user has already liked the card
  console.log(req.body)
  const existingLike = await Like.findOne({ cardId, userId });

  if (existingLike) {
    // User already liked the card, remove the like
    await Like.findByIdAndDelete(existingLike._id);
    res.json({ liked: false, cardId: cardId });
  } else {
    // User hasn't liked the card, add a like
    const newLike = new Like({ cardId, userId, liked: true });
    await newLike.save();
    res.json({ liked: true, cardId: cardId, userId: userId });
  }
});



// Get likes for a card
router.get('/:cardId', async (req, res) => {
  const cardId = req.params.cardId;

  // Find all likes for the card
  const likes = await Like.find({ cardId });

  res.json({ likes });
});


router.get('/get/all', async (req, res) => {
  try {
    // Find all Likes
    console.log("here into ratings")
    const allLikes = await Like.find();
    res.json({ likes: allLikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Get all likes for a specific user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId; // You should ensure that this parameter is the user's ID

  // Find all likes associated with the user
  const userLikes = await Like.find({ userId }).populate('cardId');

  res.json({ userLikes });
});

module.exports = router;
