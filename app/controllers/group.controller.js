const Group = require("../models/group");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");

/**
 * Get all groups
 * @param req
 * @param res
 * @returns void
 */
exports.getGroups = (req, res) => {
  Group.find().sort('-created_at').exec((err, groups) => {
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
exports.addGroup = (req, res) => {
  if (!req.body.title) {
    res.status(403).end();
  }

  const newGroup = new Group(req.body);

  // Let's sanitize inputs
  newGroup.cuid = cuid();
  newGroup.title = sanitizeHtml(req.body.title);
  newGroup.created_by = req.user._id;
  newGroup.save((err, saved) => {
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
exports.getGroup = (req, res) => {
  Group.findOne({ cuid: req.params.cuid }).exec((err, group) => {
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
exports.deleteGroup = (req, res) => {
  Group.findOne({ cuid: req.params.cuid }).exec((err, group) => {
    if (err) {
      res.status(500).send(err);
    }

    group.remove(() => {
      res.json({ msg: "Group Deleted" });
      res.status(200).end();
    });
  });
};