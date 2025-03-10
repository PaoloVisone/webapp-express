// Express
const express = require('express');
const router = express.Router();

// Controller
const movieController = require("../controllers/moviesController");

// Rotte
router.get('/', movieController.index)
router.get('/:id', movieController.show)

// Export
module.exports = router