var express = require('express');
var router = express.Router();
var passport = require('passport');
const RoleController = require('../controllers/role.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all roles
router.get('/roles', AuthController.isAuthenticated, RoleController.getRoles);

// Get one track by cuid
router.get('/roles/:cuid', AuthController.isAuthenticated, RoleController.getRole);

// Add a new Role
router.post('/roles', AuthController.isAuthenticated, RoleController.addRole);

// Delete a track by cuid
router.delete('/roles/:cuid', AuthController.isAuthenticated, RoleController.deleteRole);

module.exports = router;