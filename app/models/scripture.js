const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scriptureSchema = new Schema({
  cuid: { type: 'String', required: true },
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

module.exports = mongoose.model('Scripture', scriptureSchema);

