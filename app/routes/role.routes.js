var express = require('express');
var router = express.Router();
var passport = require('passport');
const RoleController = require('../controllers/role.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all roles
router.get('/roles', AuthController.isAuthenticated, RoleController.getRoles);

// Get one track by id
router.get('/roles/:id', AuthController.isAuthenticated, RoleController.getRole);

// Add a new Role
router.post('/roles', AuthController.isAuthenticated, RoleController.addRole);

// Delete a track by id
router.delete('/roles/:id', AuthController.isAuthenticated, RoleController.deleteRole);

module.exports = router;