var express = require('express');
var router = express.Router();
var passport = require('passport');
const PostController = require('../controllers/post.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all posts
router.get('/post', AuthController.isAuthenticated, PostController.getPosts);

// Get one track by id
router.get('/post/:id', AuthController.isAuthenticated, PostController.getPost);

// Add a new Post
router.post('/post', AuthController.isAuthenticated, PostController.addPost);

// Delete a track by id
router.delete('/post/:id', AuthController.isAuthenticated, PostController.deletePost);

module.exports = router;