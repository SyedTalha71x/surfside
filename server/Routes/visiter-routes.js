// routes/visitRoutes.js
import express from 'express';
import { getTotalVisits } from '../Controllers/visiter-controller.js';

const router = express.Router();

router.get('/total-visitors', getTotalVisits);


export default router;