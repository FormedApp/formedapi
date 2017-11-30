import Activity from "../models/activity";
import Track from "../models/track";
import * as cuid from "cuid";
import * as sanitizeHtml from "sanitize-html";
import { Request, Response } from "express";

/**
 * Get all tracks
 * @param req
 * @param res
 * @returns void
 */
export const getTracks = (req: Request, res: Response) => {
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
    .exec(function(err: Error, tracks: any) {
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
export const addTrack = (req: Request, res: Response) => {
  if (!req.body.title) {
    res.status(403).end();
  }

  const newTrack = new Track(req.body);

  // Let's sanitize inputs
  newTrack.id = cuid();
  newTrack.title = sanitizeHtml(req.body.title);
  newTrack.description = sanitizeHtml(req.body.description);
  newTrack.created_by = req.user.id;
  newTrack.save((err: Error) => {
    if (err) {
      res.status(500).send(err);
    }
    Track.find()
      .sort("-created_at")
      .exec((err: Error, tracks: any) => {
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
export const getTrack = (req: Request, res: Response) => {
  Track.findOne({ id: req.params.id }).exec((err: Error, track: any) => {
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
export const deleteTrack = (req: Request, res: Response) => {
  Track.findOne({ id: req.params.id }).exec((err: Error, track: any) => {
    if (err) {
      res.status(500).send(err);
    }

    track.remove(() => {
      Track.find()
        .sort("-created_at")
        .exec((err: Error, tracks: any) => {
          if (err) {
            res.status(500).send(err);
          }
          res.json({ tracks });
        });
    });
  });
};
