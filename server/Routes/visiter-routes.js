// routes/visitRoutes.js
import express from 'express';
import { getTotalVisits, getCombinedVisitorsAndConversions, getRegularUsers, getComparisonMetrics } from '../Controllers/visiter-controller.js';

const router = express.Router();

router.get('/total-visitors', getTotalVisits);
router.get('/combined-visitors-and-conversions', getCombinedVisitorsAndConversions);
router.get('/regular-users', getRegularUsers);
router.get('/comparison-metrics', getComparisonMetrics);



export default router;