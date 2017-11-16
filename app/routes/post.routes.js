var express = require('express');
var router = express.Router();
var passport = require('passport');
const PostController = require('../controllers/post.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all tracks
router.get('/posts', AuthController.isAuthenticated, PostController.getPosts);

// Get one track by id
router.get('/posts/:id', AuthController.isAuthenticated, PostController.getPost);

// Add a new Track
router.post('/posts', AuthController.isAuthenticated, PostController.addPost);

// Delete a track by id
router.delete('/posts/:id', AuthController.isAuthenticated, PostController.deletePost);

module.exports = router;