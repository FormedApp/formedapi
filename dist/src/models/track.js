"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let mongoose = require("mongoose");
let TrackSchema = new mongoose_1.Schema({
    id: { type: "String", required: true },
    title: { type: "String", required: true },
    description: { type: "String", required: true },
    groups: { type: Array },
    created_by: { type: "String", required: true },
    created_at: { type: "Date", default: Date.now, required: true },
    updated_at: { type: "Date", default: Date.now, required: true }
});
// on every save, add the date
TrackSchema.pre("save", function (next) {
    // get the current date
    let currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
// create the model for post and expose it to our app
const Track = mongoose_1.model("Track", TrackSchema);
exports.default = Track;
//# sourceMappingURL=track.js.map