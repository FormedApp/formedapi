const Track = require("../models/track");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");
const passport = require('../../config/passport');

exports.getTracks = (req, res) => {
  Track.find().sort('-created_at').exec((err, tracks) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tracks });
  });
};

exports.addTrack = (req, res) => {
  if (!req.body.post.content) {
    res.status(403).end();
  }

  const newTrack = new Track(req.body.post);

  // Let's sanitize inputs
  newTrack.content = sanitizeHtml(newTrack.content);
  newTrack.cuid = cuid();
  newTrack.user_id = 1234;
  newTrack.group_id = 1;
  newTrack.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
};

exports.getTrack = (req, res) => {
  Track.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
};

exports.deleteTrack = (req, res) => {
  Track.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
};
