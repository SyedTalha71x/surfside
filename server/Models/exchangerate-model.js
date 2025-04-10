import mongoose from "mongoose";
import { SUPPORTED_CRYPTOS, SUPPORTED_FIATS } from "../config/constants.js";


const ExchangeRateSchema = new mongoose.Schema({
    baseCurrency: {
      type: String,
      required: true,
      uppercase: true,
      enum: SUPPORTED_CRYPTOS
    },
    targetCurrency: {
      type: String,
      required: true,
      uppercase: true,
      enum: [...SUPPORTED_CRYPTOS, ...SUPPORTED_FIATS]
    },
    rate: {
      type: Number,
      required: true,
      min: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
      index: true
    }
  }, { timestamps: true });


ExchangeRateSchema.index({ baseCurrency: 1, targetCurrency: 1 }, { unique: true });

const ExchangeRate = mongoose.models.ExchangeRate || mongoose.model('ExchangeRate', ExchangeRateSchema);
export default ExchangeRate;
