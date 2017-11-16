var express = require('express');
var router = express.Router();
var passport = require('passport');
const GroupController = require('../controllers/group.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all groups
router.get('/groups', AuthController.isAuthenticated, GroupController.getGroups);

// Get one track by id
router.get('/groups/:id', AuthController.isAuthenticated, GroupController.getGroup);

// Add a new Group
router.post('/groups', AuthController.isAuthenticated, GroupController.addGroup);

// Delete a track by id
router.delete('/groups/:id', AuthController.isAuthenticated, GroupController.deleteGroup);

module.exports = router;