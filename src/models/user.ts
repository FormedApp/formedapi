import { NextFunction } from "express";
import { Document, Schema, Model, model } from "mongoose";
import * as bcrypt from "bcrypt";

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

export interface IUser extends Document {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    groups: string[];
    roles: string[];
    password: string;
    created_at: Date;
    updated_at: Date;
}

// set up a mongoose model
const UserSchema = new Schema({
  id: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  groups: { type: Array },
  roles: { type: Array },
  password: { type: String, required: true },
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true }
});

UserSchema.pre("save", function(this: any, next: NextFunction) {
  const user = this;
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err: Error, salt: any) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err: Error, hash: any) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(passw: any, cb: any) {
  bcrypt.compare(passw, this.password, function(err: Error, isMatch: any) {
    if (err) {
      return cb(err);
    }
    cb(undefined, isMatch);
  });
};

const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;
