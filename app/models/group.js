const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  cuid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Group', groupSchema);

