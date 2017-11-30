import Activity from "../models/activity";
import * as cuid from "cuid";
import * as sanitizeHtml from "sanitize-html";
import { Request, Response } from "express";

/**
 * Get all activities
 * @param req
 * @param res
 * @returns void
 */
export const getActivities = (req: Request, res: Response) => {
  Activity.find().sort("-created_at").exec((err: Error, activities: any) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ activities });
  });
};

/**
 * Save a new activity
 * @param req
 * @param res
 * @returns void
 */
export const addActivity = (req: Request, res: Response) => {
  if (!req.body.title) {
    res.status(403).end();
  }

  const newActivity = new Activity(req.body);

  // Let's sanitize inputs
  newActivity.id = cuid();
  newActivity.title = sanitizeHtml(req.body.title);
  newActivity.receive = sanitizeHtml(req.body.receive);
  newActivity.respond = sanitizeHtml(req.body.respond);
  newActivity.track_id = sanitizeHtml(req.body.track_id);
  newActivity.save((err: Error) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ activity: "Yay! Activity added successfully." });
  });
};

/**
 * Update a activity
 * @param req
 * @param res
 * @returns void
 */

/**
 * Get a single activity
 * @param req
 * @param res
 * @returns void
 */
export const getActivity = (req: Request, res: Response) => {
  Activity.findOne({ id: req.params.id }).exec((err: Error, activity: any) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ activity});
  });
};

/**
 * Delete a activity
 * @param req
 * @param res
 * @returns void
 */
export const deleteActivity = (req: Request, res: Response) => {
  Activity.findOne({ id: req.params.id }).exec((err: Error, activity: any) => {
    if (err) {
      res.status(500).send(err);
    }

    activity.remove(() => {
      res.json({ msg: "Activity Deleted" });
      res.status(200).end();
    });
  });
};