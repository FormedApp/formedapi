import * as mongoose from "mongoose";
import { NextFunction } from "express";
import { Document, Schema, Model, model } from "mongoose";


interface IActivity extends Document {
  id: string;
  title: string;
  receive: string;
  respond: string;
  track_id: string;
  created_at: Date;
  updated_at: Date;
}

const ActivitySchema = new Schema({
  id: { type: "String", required: true },
  title: { type: "String", required: true },
  receive: { type: "String", required: true },
  respond: { type: "String", required: true },
  track_id: { type: "String"},
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true },
});

// on every save, add the date
ActivitySchema.pre("save", function(this: any, next: NextFunction) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

const Activity: Model<IActivity> = model<IActivity>("Activity", ActivitySchema);
export default Activity;
