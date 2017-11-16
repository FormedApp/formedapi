var express = require('express');
var router = express.Router();
var passport = require('passport');
const AuthenticationController = require('../controllers/authentication.controller');
var AuthController = require('../controllers/passportAuth.controller');

router.post('/signup', AuthenticationController.signup);
router.post('/authenticate',  AuthenticationController.authenticate);


module.exports = router;