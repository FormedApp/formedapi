// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ScheduleSchema = new Schema({

  schedule_time: Date,
  user: String,
  recycler: String,
  status: String,
  pickup_id: Number,
  cancel_state: String,
  cancel_note: String,
  updated_at: Date,
  created_at: Date
});



// on every save, add the date
ScheduleSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// the schema is useless so far
// we need to create a model using it
var Schedule = mongoose.model('Schedule', ScheduleSchema);

// make this available to our users in our Node applications
module.exports = Schedule;