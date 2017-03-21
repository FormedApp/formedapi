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
  if (!req.body.scripture.verse) {
    res.status(403).end();
  }

  const newScripture = new Scripture(req.body);

  // Let's sanitize inputs
  newScripture.cuid = cuid();
  newScripture.user_id = req.user._id;
  newScripture.group_id = 1;
  newScripture.verse = sanitizeHtml(newScripture.verse);
  newScripture.passage = sanitizeHtml(newScripture.passage);
  newScripture.book_name = sanitizeHtml(newScripture.book_name);
  newScripture.chapter_id = sanitizeHtml(newScripture.chapter_id);
  newScripture.verse_id = sanitizeHtml(newScripture.verse_id);
  newScripture.verse_text = sanitizeHtml(newScripture.verse_text);
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
