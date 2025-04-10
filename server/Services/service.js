import ExchangeRate from '../Models/exchangerate-model.js';
import axios from 'axios';
import { COINBASE_API, CACHE_DURATION_MS } from '../config/constants.js';

class CoinbaseService {
  constructor() {
    this.baseUrl = COINBASE_API;
  }

  async fetchFromCoinbase(baseCurrency) {
    try {
      const response = await axios.get(`${this.baseUrl}?currency=${baseCurrency}`);
      return response.data.data.rates;
    } catch (error) {
      throw new Error(`Coinbase API Error: ${error.message}`);
    }
  }

  async getRate(baseCurrency, targetCurrency) {
    try {
      baseCurrency = baseCurrency.toUpperCase();
      targetCurrency = targetCurrency.toUpperCase();

      const cachedRate = await ExchangeRate.findOne({
        baseCurrency,
        targetCurrency,
        lastUpdated: { $gte: new Date(Date.now() - CACHE_DURATION_MS) }
      });

      if (cachedRate) return cachedRate;

      const rates = await this.fetchFromCoinbase(baseCurrency);
      
      if (!rates[targetCurrency]) {
        throw new Error(`Target currency ${targetCurrency} not supported`);
      }

      const updatedRate = await ExchangeRate.findOneAndUpdate(
        { baseCurrency, targetCurrency },
        { rate: rates[targetCurrency], lastUpdated: new Date() },
        { new: true, upsert: true }
      );

      return updatedRate;
    } catch (error) {
      throw error;
    }
  }

  async getAllRates(baseCurrency) {
    try {
      baseCurrency = baseCurrency.toUpperCase();
      const rates = await this.fetchFromCoinbase(baseCurrency);

      const updateOps = Object.keys(rates).map(targetCurrency => ({
        updateOne: {
          filter: { 
            baseCurrency, 
            targetCurrency: targetCurrency.toUpperCase() 
          },
          update: { 
            $set: { 
              rate: rates[targetCurrency], 
              lastUpdated: new Date() 
            } 
          },
          upsert: true
        }
      }));

      if (updateOps.length > 0) {
        await ExchangeRate.bulkWrite(updateOps);
      }

      return rates;
    } catch (error) {
      throw error;
    }
  }
}

export default new CoinbaseService();