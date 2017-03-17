const Track = require("../models/track");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");

exports.getTracks = (req, res) => {
  Track.find().sort('-created_at').exec((err, tracks) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tracks });
  });
};

exports.addTrack = (req, res) => {
  if (!req.body.title) {
    res.status(403).end();
  }

  const newTrack = new Track(req.body);

  // Let's sanitize inputs
  newTrack.cuid = cuid();
  newTrack.title = req.body.title;
  newTrack.description = req.body.description;
  newTrack.created_by = req.user._id;
  newTrack.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ track: "saved Track" });
  });
};

exports.getTrack = (req, res) => {
  Track.findOne({ cuid: req.params.cuid }).exec((err, track) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ track});
  });
};

exports.deleteTrack = (req, res) => {
  Track.findOne({ cuid: req.params.cuid }).exec((err, track) => {
    if (err) {
      res.status(500).send(err);
    }

    track.remove(() => {
      res.json({ msg: "Track Deleted" });
      res.status(200).end();
    });
  });
};
