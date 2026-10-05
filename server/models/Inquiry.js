import mongoose from 'mongoose';
export default mongoose.model('Inquiry', new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  service: String,
  message: String,
  quote: { country: String, document: String, service: String },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true }));
