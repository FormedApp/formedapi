import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  cuid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Group', groupSchema);
