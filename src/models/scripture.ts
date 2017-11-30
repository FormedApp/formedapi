import { NextFunction } from "express";
import { Document, Schema, Model, model } from "mongoose";

const mongoose = require("mongoose");


interface IScripture extends Document {
  id: string;
  user_id: number;
  group_id: number;
  verse: string;
  passage: string;
  book_name: string;
  chapter_id: number;
  verse_id: number;
  verse_text: string;
  created_at: Date;
  updated_at: Date;
}

const ScriptureSchema = new Schema({
  id: { type: "String", required: true },
  user_id: { type: "Number", required: true },
  group_id: { type: "Number", required: true },
  verse: { type: "String", required: true },
  passage: { type: "String", required: true },
  book_name: { type: "String", required: true },
  chapter_id: { type: "Number", required: true },
  verse_id: { type: "Number", required: true },
  verse_text: { type: "String", required: true },
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true },
});

ScriptureSchema.pre("save", function(this: any, next: NextFunction) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

const Scripture: Model<IScripture> = model<IScripture>("Scripture", ScriptureSchema);
export default Scripture;

