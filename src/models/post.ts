import * as mongoose from "mongoose";
import { NextFunction } from "express";
import { Document, Schema, Model, model } from "mongoose";


interface IPost extends Document {
  id: string;
  content: string;
  user_id: string;
  group_id: string;
  created_at: Date;
  updated_at: Date;
}

const PostSchema = new Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  user_id: { type: String, required: true },
  group_id: { type: String },
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true }
});

// on every save, add the date
PostSchema.pre("save", function(this: any, next: NextFunction) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

const Post: Model<IPost> = model<IPost>("Post", PostSchema);
export default Post;
