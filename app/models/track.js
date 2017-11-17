var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TrackSchema = new Schema({
  id: { type: "String", required: true },
  title: { type: "String", required: true },
  description: { type: "String", required: true },
  groups: { type: Array },
  created_by: { type: "String", required: true },
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true }
});

// on every save, add the date
TrackSchema.pre("save", function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

// create the model for post and expose it to our app
module.exports = mongoose.model("Track", TrackSchema);
