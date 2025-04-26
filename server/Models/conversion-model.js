import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true,
    enum: ['crypto', 'regular']
  },
  cryptoType: {
    type: String,
    required: function() { return this.type === 'crypto'; },
    uppercase: true
  },
  fromCurrency: {
    type: String,
    uppercase: true
  },
  toCurrency: {
    type: String,
    uppercase: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  rate: {
    type: Number,
    required: true
  },
  convertedAmount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Indexes for faster queries
conversionSchema.index({ type: 1, timestamp: 1 });
conversionSchema.index({ cryptoType: 1, timestamp: 1 });

const Conversion = mongoose.model('Conversion', conversionSchema);
export default Conversion;