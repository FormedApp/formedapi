var express = require('express');
var router = express.Router();
var passport = require('passport');
const JournalController = require('../controllers/journal.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all tracks
router.get('/journal', AuthController.isAuthenticated, JournalController.getJournals);

// Get one track by id
router.get('/journal/:id', AuthController.isAuthenticated, JournalController.getJournal);

// Add a new Journal
router.post('/journal', AuthController.isAuthenticated, JournalController.addJournal);

// Delete a track by id
router.delete('/journal/:id', AuthController.isAuthenticated, JournalController.deleteJournal);

module.exports = router;