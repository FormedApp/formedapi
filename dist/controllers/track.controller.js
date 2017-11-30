"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const track_1 = require("../models/track");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");
/**
 * Get all tracks
 * @param req
 * @param res
 * @returns void
 */
exports.getTracks = (req, res) => {
    track_1.default.aggregate([
        {
            $lookup: {
                from: "activities",
                localField: "id",
                foreignField: "track_id",
                as: "activities"
            }
        }
    ])
        .sort("-created_at")
        .exec(function (err, tracks) {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ tracks });
    });
};
/**
 * Save a new track
 * @param req
 * @param res
 * @returns void
 */
exports.addTrack = (req, res) => {
    if (!req.body.title) {
        res.status(403).end();
    }
    const newTrack = new track_1.default(req.body);
    // Let's sanitize inputs
    newTrack.id = cuid();
    newTrack.title = sanitizeHtml(req.body.title);
    newTrack.description = sanitizeHtml(req.body.description);
    newTrack.created_by = req.user.id;
    newTrack.save((err) => {
        if (err) {
            res.status(500).send(err);
        }
        track_1.default.find()
            .sort("-created_at")
            .exec((err, tracks) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ tracks });
        });
    });
};
/**
 * Get a single track
 * @param req
 * @param res
 * @returns void
 */
exports.getTrack = (req, res) => {
    track_1.default.findOne({ id: req.params.id }).exec((err, track) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ track });
    });
};
/**
 * Delete a track
 * @param req
 * @param res
 * @returns void
 */
exports.deleteTrack = (req, res) => {
    track_1.default.findOne({ id: req.params.id }).exec((err, track) => {
        if (err) {
            res.status(500).send(err);
        }
        track.remove(() => {
            track_1.default.find()
                .sort("-created_at")
                .exec((err, tracks) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ tracks });
            });
        });
    });
};
//# sourceMappingURL=track.controller.js.map