import { NextFunction } from "express";
import { Document, Schema, Model, model } from "mongoose";

const mongoose = require("mongoose");


interface IRole extends Document {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

const RoleSchema = new Schema({
  id: { type: "String", required: true },
  title: { type: "String", required: true },
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true },
});

// on every save, add the date
RoleSchema.pre("save", function(this: any, next: NextFunction) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

const Role: Model<IRole> = model<IRole>("Role", RoleSchema);
export default Role;
