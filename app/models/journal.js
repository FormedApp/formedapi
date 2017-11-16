const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
  id: { type: String, required: true },
  entry: { type: String, required: true },
  user_id: { type: String, required: true },
  groups: { type: Array },
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true }
});

module.exports = mongoose.model("Journal", journalSchema);
