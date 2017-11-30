"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../models/post");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");
/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
exports.getPosts = (req, res) => {
    post_1.default.find({ user_id: req.user.id }).sort("-created_at").exec((err, posts) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ posts });
    });
};
/**
 * Save a new post
 * @param req
 * @param res
 * @returns void
 */
exports.addPost = (req, res) => {
    if (!req.body.content) {
        res.status(403).end();
    }
    const newPost = new post_1.default(req.body);
    // Let's sanitize inputs
    newPost.id = cuid();
    newPost.content = sanitizeHtml(req.body.content);
    newPost.user_id = req.user.id;
    newPost.group_id = "";
    newPost.save((err) => {
        if (err) {
            res.status(500).send(err);
        }
        post_1.default.find({ user_id: req.user.id }).sort("-created_at").exec((err, posts) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ posts });
        });
    });
};
/**
 * Update a post
 * @param req
 * @param res
 * @returns void
 */
/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
exports.getPost = (req, res) => {
    post_1.default.findOne({ id: req.params.id }).exec((err, post) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ post });
    });
};
/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
exports.deletePost = (req, res) => {
    post_1.default.findOne({ id: req.params.id }).exec((err, post) => {
        if (err) {
            res.status(500).send(err);
        }
        post.remove(() => {
            res.json({ msg: "Post Deleted" });
            res.status(200).end();
        });
    });
};
//# sourceMappingURL=post.controller.js.map