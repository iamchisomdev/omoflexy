import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.HOST || 'http://localhost:5173', // Your Vite frontend URL
  credentials: true, // allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware for login/logout
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // set this in .env
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set true if using https
}));

// Routes
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes); // <-- added auth routes

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
