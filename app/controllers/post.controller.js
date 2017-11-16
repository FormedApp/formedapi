const Post = require("../models/post");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
exports.getPosts = (req, res) => {
  Post.find().sort('-created_at').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
exports.addPost = (req, res) => {
  if (!req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body);

  // Let's sanitize inputs
  newPost.content = sanitizeHtml(newPost.content);
  newPost.id = cuid();
  newPost.user_id = req.user._id;
  newPost.group_id = sanitizeHtml(req.body.group_id);
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
exports.getPost = (req, res) => {
  Post.findOne({ id: req.params.id }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
exports.deletePost = (req, res) => {
  Post.findOne({ id: req.params.id }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
