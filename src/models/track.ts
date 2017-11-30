import { NextFunction } from "express";
import { Document, Schema, Model, model } from "mongoose";

const mongoose = require("mongoose");


interface ITrack extends Document {
  id: string;
  title: string;
  description: string;
  groups: string[];
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

const TrackSchema = new Schema({
  id: { type: "String", required: true },
  title: { type: "String", required: true },
  description: { type: "String", required: true },
  groups: { type: Array },
  created_by: { type: "String", required: true },
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true }
});

// on every save, add the date
TrackSchema.pre("save", function(this: any, next: NextFunction) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

// create the model for post and expose it to our app
const Track: Model<ITrack> = model<ITrack>("Track", TrackSchema);
export default Track;
