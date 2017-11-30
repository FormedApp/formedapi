"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const ScriptureSchema = new mongoose_1.Schema({
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
ScriptureSchema.pre("save", function (next) {
    // get the current date
    const currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
const Scripture = mongoose_1.model("Scripture", ScriptureSchema);
exports.default = Scripture;
//# sourceMappingURL=scripture.js.map