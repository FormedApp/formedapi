var express = require('express');
var router = express.Router();
var passport = require('passport');
const TrackController = require('../controllers/track.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all tracks
router.get('/tracks', AuthController.isAuthenticated, TrackController.getTracks);

// Get one track by cuid
router.get('/tracks/:cuid', AuthController.isAuthenticated, TrackController.getTrack);

// Add a new Track
router.post('/tracks', AuthController.isAuthenticated, TrackController.addTrack);

// Delete a track by cuid
router.delete('/tracks/:cuid', AuthController.isAuthenticated, TrackController.deleteTrack);

module.exports = router;