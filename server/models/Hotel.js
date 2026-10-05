import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stars: { type: Number, min: 1, max: 5 },
  location: String,
  pricePerNight: { type: Number, required: true },
  availableFrom: Date,
  status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);
