"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    id: { type: "String", required: true },
    title: { type: "String", required: true },
    created_at: { type: "Date", default: Date.now, required: true },
    updated_at: { type: "Date", default: Date.now, required: true },
});
// on every save, add the date
RoleSchema.pre("save", function (next) {
    // get the current date
    let currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
const Role = mongoose_1.model("Role", RoleSchema);
exports.default = Role;
//# sourceMappingURL=role.js.map