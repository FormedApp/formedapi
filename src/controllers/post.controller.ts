import { Request, Response } from "express";
import { Error } from "mongoose";
import { WriteError } from "mongodb";

import Post from "../models/post";
import * as cuid from "cuid";
import * as sanitizeHtml from "sanitize-html";

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export const getPosts = (req: Request, res: Response) => {
  Post.find({ user_id: req.user.id }).sort("-created_at").exec((err: Error, posts: any) => {
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
export const addPost = (req: Request, res: Response) => {
  if (!req.body.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body);

  // Let's sanitize inputs
  newPost.id = cuid();
  newPost.content = sanitizeHtml(req.body.content);
  newPost.user_id = req.user.id;
  newPost.group_id = "";
  newPost.save((err: WriteError) => {
    if (err) {
      res.status(500).send(err);
    }
    Post.find({ user_id: req.user.id }).sort("-created_at").exec((err: Error, posts: any) => {
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
export const getPost = (req: Request, res: Response) => {
  Post.findOne({ id: req.params.id }).exec((err: Error, post: any) => {
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
export const deletePost = (req: Request, res: Response) => {
  Post.findOne({ id: req.params.id }).exec((err: Error, post: any) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.json({ msg: "Post Deleted" });
      res.status(200).end();
    });
  });
};