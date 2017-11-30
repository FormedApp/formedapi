"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ActivitySchema = new mongoose_1.Schema({
    id: { type: "String", required: true },
    title: { type: "String", required: true },
    receive: { type: "String", required: true },
    respond: { type: "String", required: true },
    track_id: { type: "String" },
    created_at: { type: "Date", default: Date.now, required: true },
    updated_at: { type: "Date", default: Date.now, required: true },
});
// on every save, add the date
ActivitySchema.pre("save", function (next) {
    // get the current date
    const currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
const Activity = mongoose_1.model("Activity", ActivitySchema);
exports.default = Activity;
//# sourceMappingURL=activity.js.map