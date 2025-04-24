import express from 'express';
import cors from 'cors';
import connectToDB from './Utils/db.js';
import { configDotenv } from 'dotenv';

import rateRoutes from './Routes/rate-routes.js';
import ContactRoutes from './Routes/contact-routes.js';

configDotenv();
connectToDB();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS setup
const allowedOrigins = [
  'https://surfside-eight.vercel.app',
  'http://localhost:3000'
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
