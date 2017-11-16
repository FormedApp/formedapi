const Activity = require("../models/activity");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");

/**
 * Get all activities
 * @param req
 * @param res
 * @returns void
 */
exports.getActivities = (req, res) => {
  Activity.find().sort('-created_at').exec((err, activities) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ activities });
  });
};

/**
 * Save a new activity
 * @param req
 * @param res
 * @returns void
 */
exports.addActivity = (req, res) => {
  if (!req.body.title) {
    res.status(403).end();
  }

  const newActivity = new Activity(req.body);

  // Let's sanitize inputs
  newActivity.id = cuid();
  newActivity.title = sanitizeHtml(req.body.title);
  newActivity.receive = sanitizeHtml(req.body.receive);
  newActivity.respond = sanitizeHtml(req.body.respond);
  newActivity.reflect = sanitizeHtml(req.body.reflect);
  newActivity.created_by = req.user._id;
  newActivity.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ activity: "Yay! Activity added successfully." });
  });
};

/**
 * Update a activity
 * @param req
 * @param res
 * @returns void
 */

/**
 * Get a single activity
 * @param req
 * @param res
 * @returns void
 */
exports.getActivity = (req, res) => {
  Activity.findOne({ id: req.params.id }).exec((err, activity) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ activity});
  });
};

/**
 * Delete a activity
 * @param req
 * @param res
 * @returns void
 */
exports.deleteActivity = (req, res) => {
  Activity.findOne({ id: req.params.id }).exec((err, activity) => {
    if (err) {
      res.status(500).send(err);
    }

    activity.remove(() => {
      res.json({ msg: "Activity Deleted" });
      res.status(200).end();
    });
  });
};