require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

app.get('/', (req, res) => {
  res.json({ message: 'Amazon Clone API is running' });
});

// GET /api/banners - Serve banner data from backend
app.get('/api/banners', (req, res) => {
  res.json([
    { id: 1, image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=400&fit=crop", alt: "Great Indian Festival" },
    { id: 2, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=400&fit=crop", alt: "Electronics Sale" },
    { id: 3, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=400&fit=crop", alt: "Fashion Deals" },
    { id: 4, image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=1400&h=400&fit=crop", alt: "Home Essentials" },
  ]);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
