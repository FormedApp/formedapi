var express = require('express');
var router = express.Router();
var passport = require('passport');
const ActivityController = require('../controllers/activity.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all tracks
router.get('/activities', AuthController.isAuthenticated, ActivityController.getActivities);

// Get one track by id
router.get('/activities/:id', AuthController.isAuthenticated, ActivityController.getActivity);

// Add a new Activity
router.post('/activities', AuthController.isAuthenticated, ActivityController.addActivity);

// Delete a track by id
router.delete('/activities/:id', AuthController.isAuthenticated, ActivityController.deleteActivity);

module.exports = router;