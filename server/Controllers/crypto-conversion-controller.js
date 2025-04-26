import Conversion from '../Models/conversion-model.js';

export const getCryptoConversionAnalytics = async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case '24h':
        dateFilter.timestamp = { $gte: new Date(now.setDate(now.getDate() - 1)) };
        break;
      case '7d':
        dateFilter.timestamp = { $gte: new Date(now.setDate(now.getDate() - 7)) };
        break;
      case '30d':
        dateFilter.timestamp = { $gte: new Date(now.setDate(now.getDate() - 30)) };
        break;
    }

    const summary = await Conversion.aggregate([
      { 
        $match: { 
          type: 'crypto',
          ...dateFilter 
        } 
      },
      {
        $group: {
          _id: '$cryptoType',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          totalConverted: { $sum: '$convertedAmount' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const trends = await Conversion.aggregate([
      { 
        $match: { 
          type: 'crypto',
          ...dateFilter 
        } 
      },
      {
        $group: {
          _id: {
            $dateToString: { 
              format: "%Y-%m-%d", 
              date: "$timestamp" 
            }
          },
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        period,
        summary,
        trends
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get conversion analytics',
      error: error.message
    });
  }
};