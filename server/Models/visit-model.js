import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  ipAddress: String,
  userAgent: String,
  referrer: String,
  country: String,
  city: String,
  createdAt: { type: Date, default: Date.now }
});

const Visit = mongoose.models.Visit || mongoose.model('Visit', visitSchema);
export default Visit;