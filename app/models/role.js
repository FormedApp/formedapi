import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  cuid: { type: 'String', required: true },
  user_id: { type: 'Number', required: true },
  group_id: { type: 'Number', required: true },
  role_type: { type: 'Number', required: true },
  content: { type: 'String', required: true },
  created_at: { type: 'Date', default: Date.now, required: true },
  updated_at: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Role', roleSchema);
