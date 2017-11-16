var express = require('express');
var router = express.Router();
var passport = require('passport');
const ScriptureController = require('../controllers/scripture.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all scriptures
router.get('/scriptures', AuthController.isAuthenticated, ScriptureController.getScriptures);

// Get one scripture by id
router.get('/scriptures/:id', AuthController.isAuthenticated, ScriptureController.getScripture);

// Add a new scripture
router.post('/scriptures', AuthController.isAuthenticated, ScriptureController.addScripture);

// Delete a scripture by id
router.delete('/scriptures/:id', AuthController.isAuthenticated, ScriptureController.deleteScripture);

module.exports = router;