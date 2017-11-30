"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
// set up a mongoose model
const UserSchema = new mongoose_1.Schema({
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
UserSchema.pre("save", function (next) {
    const user = this;
    // get the current date
    const currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(undefined, isMatch);
    });
};
const User = mongoose_1.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map