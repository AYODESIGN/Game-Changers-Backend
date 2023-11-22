const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');

// Add a rating for a card
router.post('/', async (req, res) => {
  const cardId = req.body.cardId;
  const userId = req.body.userId; // You can use authentication middleware to get the user ID
  const ratingValue = req.body.rating;

  // Check if the user has already rated the card
  const existingRating = await Rating.findOne({ cardId, userId });

  if (existingRating) {
    // User already rated the card, update the rating value
    existingRating.rating = ratingValue;
    await existingRating.save();
    res.json({ rated: true, cardId: cardId, userId: userId, rating: ratingValue });
  } else {
    // User hasn't rated the card, add a new rating
    const newRating = new Rating({ cardId, userId, rating: ratingValue });
    await newRating.save();
    res.json({ rated: true, cardId: cardId, userId: userId, rating: ratingValue });
  }
});

// Get ratings for a card
router.get('/:cardId', async (req, res) => {
  const cardId = req.params.cardId;

  // Find all ratings for the card
  const ratings = await Rating.find({ cardId });

  res.json({ ratings });
});

// Get all ratings for a specific user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId; // You should ensure that this parameter is the user's ID

  // Find all ratings associated with the user
  const userRatings = await Rating.find({ userId }).populate('cardId');

  res.json({ userRatings });
});

router.get('/get/all', async (req, res) => {
  try {
    // Find all ratings
    console.log("here into ratings")
    const allRatings = await Rating.find();
    res.json({ ratings: allRatings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
