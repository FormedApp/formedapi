const Journal = require("../models/journal");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");

/**
 * Get all journals
 * @param req
 * @param res
 * @returns void
 */
exports.getJournals = (req, res) => {
  Journal.find().sort('-created_at').exec((err, journals) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ journals });
  });
};

/**
 * Save a new journal
 * @param req
 * @param res
 * @returns void
 */
exports.addJournal = (req, res) => {
  if (!req.body.title) {
    res.status(403).end();
  }

  const newJournal = new Journal(req.body);

  // Let's sanitize inputs
  newJournal.id = cuid();
  newJournal.entry = sanitizeHtml(req.body.title);
  newJournal.user_id = sanitizeHtml(req.body.receive);
  newJournal.group_id = sanitizeHtml(req.body.respond);
  newJournal.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ journal: "Yay! Journal added successfully." });
  });
};

/**
 * Update a journal
 * @param req
 * @param res
 * @returns void
 */

/**
 * Get a single journal
 * @param req
 * @param res
 * @returns void
 */
exports.getJournal = (req, res) => {
  Journal.findOne({ id: req.params.id }).exec((err, journal) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ journal });
  });
};

/**
 * Delete a journal
 * @param req
 * @param res
 * @returns void
 */
exports.deleteJournal = (req, res) => {
  Journal.findOne({ id: req.params.id }).exec((err, journal) => {
    if (err) {
      res.status(500).send(err);
    }

    journal.remove(() => {
      res.json({ msg: "Journal Deleted" });
      res.status(200).end();
    });
  });
};