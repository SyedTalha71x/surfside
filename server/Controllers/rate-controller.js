import coinbaseService from '../Services/service.js';

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
        cryptos: ['BTC', 'ETH', 'LTC', 'BCH', 'USDC', 'ADA', 'SOL', 'XRP'],
        fiats: ['USD', 'EUR', 'GBP', 'CAD', 'JPY', 'AUD', 'INR', 'AED']
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch supported currencies'
    });
  }
};