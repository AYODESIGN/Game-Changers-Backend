const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer');
const storageConfig = multerConfig.storage;
const Card = require('../models/card');
const { requireAuth } = require("../middleware/authMiddleware");



// ADD Card
router.post('/add', multerConfig.storage.fields([{ name: 'img', maxCount: 1 }]), async (req, res) => {
  try {
    console.log('Here into BL: add card', req.body);

    const image = req.files['img'][0];

    req.body.img = `${req.protocol}://${req.get('host')}/myFiles/${image.filename}`;

    const card = new Card(req.body);
    await card.save();
    console.log('Success', card);

    res.json({ msg: 'Added with success' });
  } catch (error) {
    console.error('Here Error', error);
    res.json({ msg: 'Error' });
  }
});

// GET ALL cards
router.get('/get/all', (req, res) => {
  Card.find().then((doc) => {
    res.json({ cards: doc });
    console.log(res);
  });
});

// GET cards by collection
router.get('/get/:collection', (req, res) => {
  const collection = req.params.collection; // Get the collection from the path parameter
console.log(collection)
  Card.find({ collections : collection })
    .then((doc) => {
      res.json({ cards: doc });
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// GET cards by Id
router.get('/:id', (req, res) => {
  const id = req.params.id; // Get the collection from the path parameter
console.log(id)
  Card.find({ _id : id })
    .then((doc) => {
      res.json({ cards: doc });
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// GET LIMITED CARDS
router.get("/home/limit", (req, res) => {
  Card.find().limit(8).then((doc) => {
    res.json({ cards: doc  });
  });
 
});

// EDIT Card
router.post('/edit', multerConfig.storage.fields([{ name: 'img', maxCount: 1 }]), async (req, res) => {
  try {
    const cardId = req.body.id;
    // Check if 'img' exists in req.files and is an array
    if (req.files && Array.isArray(req.files['img']) && req.files['img'].length > 0) {
      const image = req.files['img'][0];
      req.body.img = `${req.protocol}://${req.get('host')}/myFiles/${image.filename}`;
    }
    // Update the existing card
    const updatedCard = await Card.findByIdAndUpdate(cardId, req.body, { new: true });

    if (!updatedCard) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    console.log('Success', updatedCard);
    res.json({ msg: 'Updated with success', updatedCard });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


module.exports = router;
