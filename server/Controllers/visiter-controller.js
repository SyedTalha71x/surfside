// controllers/visitController.js
import Visit from '../Models/visit-model.js';

const getMonthRange = (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);
  return { startDate, endDate };
};

export const getTotalVisits = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    let filter = {};
    
    if (year && month) {
      const { startDate, endDate } = getMonthRange(parseInt(year), parseInt(month));
      filter.createdAt = { $gte: startDate, $lte: endDate };
    }
    
    const count = await Visit.countDocuments(filter);
    res.json({ totalVisits: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVisitsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const filter = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
    
    const visits = await Visit.find(filter).sort({ createdAt: -1 });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};