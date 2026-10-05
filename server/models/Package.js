import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, enum: ['Economy', 'Premium', 'Family', 'VIP'] },
  description: { type: String },
  duration: { type: Number, required: true }, // days
  pricePerPerson: { type: Number, required: true },
  totalPrice: { type: Number },
  groupSize: { type: String }, // e.g., "2-4 persons"
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  hotel: {
    name: String,
    stars: Number,
    price: Number,
  },
  inclusions: [String], // flights, visa, meals, guide, transport
  excludes: [String],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);
