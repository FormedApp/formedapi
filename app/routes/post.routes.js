var express = require('express');
var router = express.Router();
var passport = require('passport');
const PostController = require('../controllers/post.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all Posts
router.get('/', AuthController.isAuthenticated, PostController.getPosts);

// Get one Post by cuid
router.get('/:cuid', AuthController.isAuthenticated, PostController.getPost);

// Add a new Post
router.post('/', AuthController.isAuthenticated, PostController.addPost);

// Delete a Post by cuid
router.delete('/:cuid', AuthController.isAuthenticated, PostController.deletePost);

module.exports = router;