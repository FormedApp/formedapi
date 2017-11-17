const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScriptureSchema = new Schema({
  id: { type: 'String', required: true },
  user_id: { type: 'Number', required: true },
  group_id: { type: 'Number', required: true },
  verse: { type: 'String', required: true },
  passage: { type: 'String', required: true },
  book_name: { type: 'String', required: true },
  chapter_id: { type: 'Number', required: true },
  verse_id: { type: 'Number', required: true },
  verse_text: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

ScriptureSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('Scripture', ScriptureSchema);

