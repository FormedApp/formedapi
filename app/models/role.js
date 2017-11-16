const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  id: { type: 'String', required: true },
  title: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

module.exports = mongoose.model('Role', roleSchema);
