"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activity_1 = require("../models/activity");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");
/**
 * Get all activities
 * @param req
 * @param res
 * @returns void
 */
exports.getActivities = (req, res) => {
    activity_1.default.find().sort("-created_at").exec((err, activities) => {
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
    const newActivity = new activity_1.default(req.body);
    // Let's sanitize inputs
    newActivity.id = cuid();
    newActivity.title = sanitizeHtml(req.body.title);
    newActivity.receive = sanitizeHtml(req.body.receive);
    newActivity.respond = sanitizeHtml(req.body.respond);
    newActivity.track_id = sanitizeHtml(req.body.track_id);
    newActivity.save((err) => {
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
    activity_1.default.findOne({ id: req.params.id }).exec((err, activity) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ activity });
    });
};
/**
 * Delete a activity
 * @param req
 * @param res
 * @returns void
 */
exports.deleteActivity = (req, res) => {
    activity_1.default.findOne({ id: req.params.id }).exec((err, activity) => {
        if (err) {
            res.status(500).send(err);
        }
        activity.remove(() => {
            res.json({ msg: "Activity Deleted" });
            res.status(200).end();
        });
    });
};
//# sourceMappingURL=activity.controller.js.map