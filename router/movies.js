// Express
const express = require('express');
const router = express.Router();

// middleware di MULTER
const upload = require('../middlewares/multer');

// Controller
const movieController = require("../controllers/moviesController");

// Rotte

// Index
router.get('/', movieController.index)
// Show
router.get('/:id', movieController.show)
// Store Reviews
router.post('/:id/reviews', movieController.storeReviews)
// Store Movies
router.post('/', upload.single('image'), movieController.store)

// Export
module.exports = router