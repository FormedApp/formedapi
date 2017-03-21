var express = require('express');
var router = express.Router();
var passport = require('passport');
const GroupController = require('../controllers/group.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all groups
router.get('/groups', AuthController.isAuthenticated, GroupController.getGroups);

// Get one track by cuid
router.get('/groups/:cuid', AuthController.isAuthenticated, GroupController.getGroup);

// Add a new Group
router.post('/groups', AuthController.isAuthenticated, GroupController.addGroup);

// Delete a track by cuid
router.delete('/groups/:cuid', AuthController.isAuthenticated, GroupController.deleteGroup);

module.exports = router;