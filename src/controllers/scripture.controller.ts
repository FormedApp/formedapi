import Scripture from "../models/scripture";
import * as cuid from "cuid";
import * as sanitizeHtml from "sanitize-html";
import { Request, Response } from "express";

export const getScriptures = (req: Request, res: Response) => {
  Scripture.find().sort("-created_at").exec((err: Error, scriptures: any) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ scriptures });
  });
};

export const addScripture = (req: Request, res: Response) => {
  if (!req.body.scripture.verse) {
    res.status(403).end();
  }

  const newScripture = new Scripture(req.body);

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
  newScripture.save((err: Error, saved: any) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
};

export const getScripture = (req: Request, res: Response) => {
  Scripture.findOne({ id: req.params.id }).exec((err: Error, scripture: any) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ scripture });
  });
};

export const deleteScripture = (req: Request, res: Response) => {
  Scripture.findOne({ id: req.params.id }).exec((err: Error, scripture: any) => {
    if (err) {
      res.status(500).send(err);
    }

    scripture.remove(() => {
      res.status(200).end();
    });
  });
};
