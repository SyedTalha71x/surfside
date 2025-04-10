import { Router } from 'express';
import { convertCurrency, getSupportedCurrencies } from '../Controllers/rate-controller.js';

const router = Router();

router.get('/convert', convertCurrency);
router.get('/currencies', getSupportedCurrencies);

export default router;