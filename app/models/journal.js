import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const journalSchema = new Schema({
  cuid: { type: 'String', required: true },
  entry: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Journal', journalSchema);

