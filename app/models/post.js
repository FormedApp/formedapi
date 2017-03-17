const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  cuid: { type: 'String', required: true },
  user_id: { type: 'Number', required: true },
  group_id: { type: 'Number', required: false },
  activity_id: { type: 'Number', required: false },
  content: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

// on every save, add the date
PostSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// create the model for post and expose it to our app
module.exports = mongoose.model('Post', PostSchema);
