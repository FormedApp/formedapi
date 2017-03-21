const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  cuid: { type: 'String', required: true },
  role_type: { type: 'Number', required: true },
  title: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Role', roleSchema);
