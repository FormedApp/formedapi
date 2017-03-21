const Role = require("../models/role");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");

/**
 * Get all roles
 * @param req
 * @param res
 * @returns void
 */
exports.getRoles = (req, res) => {
  Role.find().sort('-created_at').exec((err, roles) => {
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

  const newRole = new Role(req.body);

  // Let's sanitize inputs
  newRole.cuid = cuid();
  newRole.title = sanitizeHtml(nreq.body.title);
  newRole.role_type = sanitizeHtml(nreq.body.role_type);
  newRole.created_by = req.user._id;
  newRole.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ role: "Yay! Role added successfully." });
  });
};

/**
 * Update a role
 * @param req
 * @param res
 * @returns void
 */

/**
 * Get a single role
 * @param req
 * @param res
 * @returns void
 */
exports.getRole = (req, res) => {
  Role.findOne({ cuid: req.params.cuid }).exec((err, role) => {
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
exports.deleteRole = (req, res) => {
  Role.findOne({ cuid: req.params.cuid }).exec((err, role) => {
    if (err) {
      res.status(500).send(err);
    }

    role.remove(() => {
      res.json({ msg: "Role Deleted" });
      res.status(200).end();
    });
  });
};