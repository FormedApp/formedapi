const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  cuid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  receive: { type: 'String', required: true },
  respond: { type: 'String', required: true },
  reflect: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Activity', activitySchema);
