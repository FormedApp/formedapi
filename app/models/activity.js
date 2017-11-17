const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  id: { type: 'String', required: true },
  title: { type: 'String', required: true },
  receive: { type: 'String', required: true },
  respond: { type: 'String', required: true },
  reflect: { type: 'String', required: true },
  track_id: { type: 'String'},
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

// on every save, add the date
ActivitySchema.pre("save", function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('Activity', ActivitySchema);
