"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("../models/role");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");
/**
 * Get all roles
 * @param req
 * @param res
 * @returns void
 */
exports.getRoles = (req, res) => {
    role_1.default.find().sort("-created_at").exec((err, roles) => {
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
exports.addRole = (req, res) => {
    if (!req.body.title) {
        res.status(403).end();
    }
    const newRole = new role_1.default(req.body);
    // Let's sanitize inputs
    newRole.id = cuid();
    newRole.title = sanitizeHtml(req.body.title);
    newRole.save((err) => {
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
exports.getRole = (req, res) => {
    role_1.default.findOne({ id: req.params.id }).exec((err, role) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ role });
    });
};
/**
 * Delete a role
 * @param req
 * @param res
 * @returns void
 */
exports.deleteRole = (req, res) => {
    role_1.default.findOne({ id: req.params.id }).exec((err, role) => {
        if (err) {
            res.status(500).send(err);
        }
        role.remove(() => {
            res.json({ msg: "Role Deleted" });
            res.status(200).end();
        });
    });
};
//# sourceMappingURL=role.controller.js.map