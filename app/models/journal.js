const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  id: { type: String, required: true },
  entry: { type: String, required: true },
  user_id: { type: String, required: true },
  groups: { type: Array },
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true }
});

// on every save, add the date
JournalSchema.pre("save", function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

module.exports = mongoose.model("Journal", JournalSchema);
