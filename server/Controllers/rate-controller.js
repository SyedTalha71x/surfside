import coinbaseService from '../Services/service.js';
import axios from 'axios'

export const convertCurrency = async (req, res) => {
  try {
    const { from, to, amount = 1 } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({ 
        success: false,
        message: 'Both "from" and "to" currency codes are required'
      });
    }

    const rate = await coinbaseService.getRate(from, to);
    const amountValue = parseInt(amount)
    const convertedAmount = amountValue * rate.rate;
    
    res.json({
      success: true,
      data: {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        rate: rate.rate,
        amount: parseFloat(amount),
        convertedAmount: convertedAmount,
        lastUpdated: rate.lastUpdated
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to convert currency'
    });
  }
};

export const getSupportedCurrencies = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        cryptos: ['BTC', 'ETH', 'USDT', 'XRP', 'BNB', 'SOL', 'ADA', 'DOGE'],
        fiats: ['USD', 'EUR', 'MXN', 'CAD', 'JPY', 'AUD', 'RUB', 'GBP', 'CHF']
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch supported currencies'
    });
  }
};

export const getExchangeRates = async (req, res) =>{
  try {
    const baseCurrency = 'USD'; 
    const targetCurrencies = ['GBP', 'EUR', 'INR', 'CAD', 'AED', 'AUD']; 
    
    const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`
    );
    
    if (response.data.result !== 'success') {
        throw new Error('Failed to fetch currency rates');
    }
    
    const currencyData = targetCurrencies.map(currency => {
        const price = response.data.conversion_rates[currency];
        const randomChange = (Math.random() * 0.1 - 0.05).toFixed(4);
        const changePercent = parseFloat(randomChange) * 100;
        
        return {
            currency: currency.toLowerCase(),
            price: price.toFixed(4),
            Days7: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`
        };
    });
    
    res.json(currencyData);
} catch (error) {
    console.error('Error fetching currency rates:', error);
    res.status(500).json({ error: 'Failed to fetch currency rates' });
}
}