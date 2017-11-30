import Role from "../models/role";
import * as cuid from "cuid";
import * as sanitizeHtml from "sanitize-html";
import { Request, Response } from "express";

/**
 * Get all roles
 * @param req
 * @param res
 * @returns void
 */
export const getRoles = (req: Request, res: Response) => {
  Role.find().sort("-created_at").exec((err: Error, roles: any) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ roles });
  });
};

/**
 * Save a new role
 * @param req
 * @param res
 * @returns void
 */
export const addRole = (req: Request, res: Response) => {
  if (!req.body.title) {
    res.status(403).end();
  }

  const newRole = new Role(req.body);

  // Let's sanitize inputs
  newRole.id = cuid();
  newRole.title = sanitizeHtml(req.body.title);
  newRole.save((err: Error) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ role: "Yay! Role added successfully." });
  });
};

/**
 * Get a single role
 * @param req
 * @param res
 * @returns void
 */
export const getRole = (req: Request, res: Response) => {
  Role.findOne({ id: req.params.id }).exec((err: Error, role: any) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ role});
  });
};

/**
 * Delete a role
 * @param req
 * @param res
 * @returns void
 */
export const deleteRole = (req: Request, res: Response) => {
  Role.findOne({ id: req.params.id }).exec((err: Error, role: any) => {
    if (err) {
      res.status(500).send(err);
    }

    role.remove(() => {
      res.json({ msg: "Role Deleted" });
      res.status(200).end();
    });
  });
};