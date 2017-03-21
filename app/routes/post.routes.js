var express = require('express');
var router = express.Router();
var passport = require('passport');
const PostController = require('../controllers/post.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all tracks
router.get('/posts', AuthController.isAuthenticated, PostController.getPosts);

// Get one track by cuid
router.get('/posts/:cuid', AuthController.isAuthenticated, PostController.getPost);

// Add a new Track
router.post('/posts', AuthController.isAuthenticated, PostController.addPost);

// Delete a track by cuid
router.delete('/posts/:cuid', AuthController.isAuthenticated, PostController.deletePost);

module.exports = router;