var express = require('express');
var router = express.Router();
var passport = require('passport');
const ScriptureController = require('../controllers/scripture.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all scriptures
router.get('/', AuthController.isAuthenticated, ScriptureController.getScriptures);

// Get one scripture by cuid
router.get('/:cuid', AuthController.isAuthenticated, ScriptureController.getScripture);

// Add a new scripture
router.post('/', AuthController.isAuthenticated, ScriptureController.addScripture);

// Delete a scripture by cuid
router.delete('/:cuid', AuthController.isAuthenticated, ScriptureController.deleteScripture);

module.exports = router;