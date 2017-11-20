const Activity = require("../models/activity");
const Track = require("../models/track");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");

/**
 * Get all tracks
 * @param req
 * @param res
 * @returns void
 */
exports.getTracks = (req, res) => {
  Track.aggregate([
    {
      $lookup: {
        from: "activities", // collection name in db
        localField: "id",
        foreignField: "track_id",
        as: "activities"
      }
    }
  ])
    .sort("-created_at")
    .exec(function(err, tracks) {
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

  const newTrack = new Track(req.body);

  // Let's sanitize inputs
  newTrack.id = cuid();
  newTrack.title = sanitizeHtml(req.body.title);
  newTrack.description = sanitizeHtml(req.body.description);
  newTrack.created_by = req.user.id;
  newTrack.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Track.find()
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
  Track.findOne({ id: req.params.id }).exec((err, track) => {
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
  Track.findOne({ id: req.params.id }).exec((err, track) => {
    if (err) {
      res.status(500).send(err);
    }

    track.remove(() => {
      Track.find()
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
