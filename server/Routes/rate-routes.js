import { Router } from 'express';
import { convertCurrency, getSupportedCurrencies, getExchangeRates } from '../Controllers/rate-controller.js';

const router = Router();

router.get('/convert', convertCurrency);
router.get('/currencies', getSupportedCurrencies);
router.get('/get-exchange-rates', getExchangeRates);


export default router;