import express from 'express';
import cors from 'cors';
import connectToDB from './Utils/db.js';
import { configDotenv } from 'dotenv';

import rateRoutes from './Routes/rate-routes.js';
import AuthRoutes from './Routes/auth-routes.js'
import ContactRoutes from './Routes/contact-routes.js';
import CryptoConversionRoutes from './Routes/crypto-conversion-routes.js'
import VisitorRoutes from './Routes/visiter-routes.js'
import trackVisit from './Middleware/track-visit.js';

configDotenv();
connectToDB();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'https://surfside-eight.vercel.app',
  'http://localhost:5173',
  'http://31.97.13.138',
  'https://convertingcurrency.com',
  'http://convertingcurrency.com'


];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api', rateRoutes);
app.use('/api', ContactRoutes);
app.use('/api', AuthRoutes);
app.use('/api', CryptoConversionRoutes);
app.use('/api', VisitorRoutes);

app.get('/api/track-visit', (req, res) => {
  trackVisit(req, res, () => {
    res.json({ message: 'Visit tracked' });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

