import Group from "../models/group";
import * as cuid from "cuid";
import * as sanitizeHtml from "sanitize-html";
import { Request, Response } from "express";
import { Error } from "mongoose";

/**
 * Get all groups
 * @param req
 * @param res
 * @returns void
 */
export const getGroups = (req: Request, res: Response) => {
  Group.find().sort("-created_at").exec((err: Error, groups: any) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ groups });
  });
};

/**
 * Save a new group
 * @param req
 * @param res
 * @returns void
 */
export const addGroup = (req: Request, res: Response) => {
  if (!req.body.title) {
    res.status(403).end();
  }

  const newGroup = new Group(req.body);

  // Let's sanitize inputs
  newGroup.id = cuid();
  newGroup.title = sanitizeHtml(req.body.title);
  newGroup.save((err: Error) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ group: "Yay! Group added successfully." });
  });
};

/**
 * Update a group
 * @param req
 * @param res
 * @returns void
 */

/**
 * Get a single group
 * @param req
 * @param res
 * @returns void
 */
export const getGroup = (req: Request, res: Response) => {
  Group.findOne({ id: req.params.id }).exec((err: Error, group: any) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ group});
  });
};

/**
 * Delete a group
 * @param req
 * @param res
 * @returns void
 */
export const deleteGroup = (req: Request, res: Response) => {
  Group.findOne({ id: req.params.id }).exec((err: Error, group: any) => {
    if (err) {
      res.status(500).send(err);
    }

    group.remove(() => {
      res.json({ msg: "Group Deleted" });
      res.status(200).end();
    });
  });
};