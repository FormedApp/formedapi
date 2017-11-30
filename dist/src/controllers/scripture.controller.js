"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scripture_1 = require("../models/scripture");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");
exports.getScriptures = (req, res) => {
    scripture_1.default.find().sort("-created_at").exec((err, scriptures) => {
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
    const newScripture = new scripture_1.default(req.body);
    // Let's sanitize inputs
    newScripture.id = cuid();
    newScripture.user_id = req.user._id;
    newScripture.group_id = 1;
    newScripture.verse = sanitizeHtml(newScripture.verse);
    newScripture.passage = sanitizeHtml(newScripture.passage);
    newScripture.book_name = sanitizeHtml(newScripture.book_name);
    newScripture.chapter_id = Number(sanitizeHtml(newScripture.chapter_id.toString()));
    newScripture.verse_id = Number(sanitizeHtml(newScripture.verse_id.toString()));
    newScripture.verse_text = sanitizeHtml(newScripture.verse_text);
    newScripture.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ post: saved });
    });
};
exports.getScripture = (req, res) => {
    scripture_1.default.findOne({ id: req.params.id }).exec((err, scripture) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ scripture });
    });
};
exports.deleteScripture = (req, res) => {
    scripture_1.default.findOne({ id: req.params.id }).exec((err, scripture) => {
        if (err) {
            res.status(500).send(err);
        }
        scripture.remove(() => {
            res.status(200).end();
        });
    });
};
//# sourceMappingURL=scripture.controller.js.map