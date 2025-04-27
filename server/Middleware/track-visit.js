// middlewares/trackVisit.js
import Visit from '../Models/visit-model.js';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';

const trackVisit = async (req, res, next) => {
  try {
    
    const ip = requestIp.getClientIp(req);
    const geo = geoip.lookup(ip);
    
    const visit = new Visit({
      ipAddress: ip,
      userAgent: req.headers['user-agent'],
      referrer: req.headers['referer'] || 'direct',
      country: geo?.country || 'Unknown',
      city: geo?.city || 'Unknown'
    });
    
    await visit.save();
    next();
  } catch (err) {
    console.error('Visit tracking error:', err);
    next(); // Continue even if tracking fails
  }
};

export default trackVisit;