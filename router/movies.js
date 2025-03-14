// Express
const express = require('express');
const router = express.Router();

// Controller
const movieController = require("../controllers/moviesController");

// Rotte
router.get('/', movieController.index)
router.get('/:id', movieController.show)
router.post('/:id/reviews', movieController.storeReviews)

// Export
module.exports = router