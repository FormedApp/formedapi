const Scripture = require("../models/scripture");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");

exports.getScriptures = (req, res) => {
  Scripture.find().sort('-created_at').exec((err, scriptures) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ scriptures });
  });
};

exports.addScripture = (req, res) => {
  if (!req.body.post.content) {
    res.status(403).end();
  }

  const newScripture = new Scripture(req.body.post);

  // Let's sanitize inputs
  newScripture.content = sanitizeHtml(newScripture.content);
  newScripture.cuid = cuid();
  newScripture.user_id = 1234;
  newScripture.group_id = 1;
  newScripture.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
};

exports.getScripture = (req, res) => {
  Scripture.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
};

exports.deleteScripture = (req, res) => {
  Scripture.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
};
