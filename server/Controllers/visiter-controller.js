// controllers/visitController.js
import Visit from "../Models/visit-model.js";
import Conversion from "../Models/conversion-model.js";

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
      const { startDate, endDate } = getMonthRange(
        parseInt(year),
        parseInt(month)
      );
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

export const getCombinedVisitorsAndConversions = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate dates
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Both startDate and endDate are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use ISO format (YYYY-MM-DD)",
      });
    }

    // Determine grouping period based on date range
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let groupBy;
    if (diffDays <= 1) {
      groupBy = "hour";
    } else if (diffDays <= 7) {
      groupBy = "day";
    } else if (diffDays <= 30) {
      groupBy = "day";
    } else {
      groupBy = "month";
    }

    // Helper function to create group object
    const createGroupId = (field) => ({
      year: { $year: `$${field}` },
      ...(groupBy === "hour"
        ? { hour: { $hour: `$${field}` } }
        : groupBy === "day"
        ? { dayOfYear: { $dayOfYear: `$${field}` } }
        : { month: { $month: `$${field}` } }),
    });

    // Visitors aggregation
    const visitorData = await Visit.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: createGroupId("createdAt"),
          date: { $first: "$createdAt" },
          visitors: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          [`_id.${groupBy === "hour" ? "hour" : groupBy === "day" ? "dayOfYear" : "month"}`]: 1,
        },
      },
      {
        $project: {
          _id: 0,
          date: 1,
          visitors: 1,
        },
      },
    ]);

    // Conversions aggregation
    const conversionData = await Conversion.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: createGroupId("timestamp"),
          date: { $first: "$timestamp" },
          conversions: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          [`_id.${groupBy === "hour" ? "hour" : groupBy === "day" ? "dayOfYear" : "month"}`]: 1,
        },
      },
      {
        $project: {
          _id: 0,
          date: 1,
          conversions: 1,
        },
      },
    ]);

    // Merge the data
    const dateMap = new Map();

    // Helper function to format dates
    const formatDate = (date, groupBy) => {
      const options =
        groupBy === "hour"
          ? { hour: "2-digit", hour12: false }
          : groupBy === "day"
          ? { day: "2-digit", month: "2-digit", year: "numeric" }
          : { month: "short", year: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    };

    // Add visitors to the map
    visitorData.forEach((item) => {
      const key = item.date.toISOString();
      dateMap.set(key, {
        ...dateMap.get(key),
        name: formatDate(item.date, groupBy),
        fullDate: item.date,
        visitors: item.visitors,
      });
    });

    // Add conversions to the map
    conversionData.forEach((item) => {
      const key = item.date.toISOString();
      dateMap.set(key, {
        ...dateMap.get(key),
        name: formatDate(item.date, groupBy),
        fullDate: item.date,
        conversions: item.conversions,
      });
    });

    const combinedData = Array.from(dateMap.values()).sort(
      (a, b) => a.fullDate - b.fullDate
    );

    combinedData.forEach((item) => {
      if (!item.visitors) item.visitors = 0;
      if (!item.conversions) item.conversions = 0;
    });

    res.json({
      success: true,
      data: combinedData,
    });
  } catch (error) {
    console.error("Error fetching combined metrics:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching combined metrics",
    });
  }
};

export const getRegularUsers = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Both startDate and endDate are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use ISO format (YYYY-MM-DD)",
      });
    }

    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const formatDate = (date, granularity) => {
      if (granularity === "hour") {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (granularity === "day") {
        return new Date(date).toLocaleDateString();
      } else if (granularity === "month") {
        return new Date(date).toLocaleDateString([], { month: 'long', year: 'numeric' });
      }
      return new Date(date).toLocaleDateString();
    };

    // Define regular users as visitors with multiple visits by IP address
    const regularUsersData = await Visit.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            ipAddress: "$ipAddress", // Use ipAddress instead of userId
            year: { $year: "$createdAt" },
            ...(diffDays <= 1
              ? { hour: { $hour: "$createdAt" } }
              : diffDays <= 30
              ? { dayOfYear: { $dayOfYear: "$createdAt" } }
              : { month: { $month: "$createdAt" } }),
          },
          date: { $first: "$createdAt" },
          visitCount: { $sum: 1 },
        },
      },
      {
        $match: {
          visitCount: { $gte: 2 } // Define "regular" as 2+ visits in the period
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            ...(diffDays <= 1
              ? { hour: { $hour: "$date" } }
              : diffDays <= 30
              ? { dayOfYear: { $dayOfYear: "$date" } }
              : { month: { $month: "$date" } }),
          },
          date: { $first: "$date" },
          regularUsers: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          [`_id.${diffDays <= 1 ? "hour" : diffDays <= 30 ? "dayOfYear" : "month"}`]: 1,
        },
      },
      {
        $project: {
          _id: 0,
          date: 1,
          regularUsers: 1,
        },
      },
    ]);

    const formattedData = regularUsersData.map(item => {
      return {
        name: formatDate(item.date, diffDays <= 1 ? "hour" : diffDays <= 30 ? "day" : "month"),
        fullDate: item.date,
        regularUsers: item.regularUsers
      };
    });

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching regular users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching regular users",
    });
  }
};

export const getComparisonMetrics = async (req, res) => {
  try {
    const { startDate, endDate, metric1 = 'desktop', metric2 = 'mobile' } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Both startDate and endDate are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use ISO format (YYYY-MM-DD)",
      });
    }

    // Define queries based on the requested metrics
    let metric1Query = {};
    let metric2Query = {};

    // Configure different metric comparisons
    switch (metric1) {
      case 'desktop':
        metric1Query = { userAgent: { $regex: /Windows|Macintosh/ } };
        break;
      case 'returning':
        // This requires a more complex aggregation - example shown below
        break;
      default:
        metric1Query = {};
    }

    switch (metric2) {
      case 'mobile':
        metric2Query = { userAgent: { $regex: /Android|iPhone|iPad/ } };
        break;
      case 'new':
        // This requires a more complex aggregation - example shown below
        break;
      default:
        metric2Query = {};
    }

    // Basic comparison between two segments
    const comparison = await Visit.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        }
      },
      {
        $facet: {
          metric1: [
            { $match: metric1Query },
            { $count: "count" }
          ],
          metric2: [
            { $match: metric2Query },
            { $count: "count" }
          ]
        }
      },
      {
        $project: {
          metric1Value: { $ifNull: [{ $arrayElemAt: ["$metric1.count", 0] }, 0] },
          metric2Value: { $ifNull: [{ $arrayElemAt: ["$metric2.count", 0] }, 0] }
        }
      }
    ]);

    // For more complex metrics like "returning users", you would need additional aggregation logic
    // For example, to identify returning users vs new users:
    
    /*
    // This would be a separate aggregation for returning vs new users
    const visitorTypes = await Visit.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        }
      },
      {
        $group: {
          _id: "$ipAddress",
          firstVisit: { $min: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      {
        $facet: {
          returning: [
            { $match: { count: { $gt: 1 } } },
            { $count: "count" }
          ],
          new: [
            { $match: { count: 1 } },
            { $count: "count" }
          ]
        }
      },
      {
        $project: {
          returningValue: { $ifNull: [{ $arrayElemAt: ["$returning.count", 0] }, 0] },
          newValue: { $ifNull: [{ $arrayElemAt: ["$new.count", 0] }, 0] }
        }
      }
    ]);
    */

    const metric1Value = comparison[0]?.metric1Value || 0;
    const metric2Value = comparison[0]?.metric2Value || 0;
    
    res.json({
      success: true,
      data: {
        metric1: {
          name: metric1 === 'desktop' ? 'Desktop' : metric1,
          value: metric1Value
        },
        metric2: {
          name: metric2 === 'mobile' ? 'Mobile' : metric2,
          value: metric2Value
        }
      }
    });
    
  } catch (error) {
    console.error("Error fetching comparison metrics:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching comparison metrics",
    });
  }
};

