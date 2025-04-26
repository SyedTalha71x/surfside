import express from 'express';
import {
  getCryptoConversionAnalytics
} from '../Controllers/crypto-conversion-controller.js';

const router = express.Router();

router.get('/analytics-crypto-conversions', getCryptoConversionAnalytics);

export default router