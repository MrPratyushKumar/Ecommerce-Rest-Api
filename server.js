require('dotenv').config()

const express = require('express')

const app = express();

const PORT = process.env.PORT || 3000;

const connectToDB = require('./database/db.js')


// MIDDLEWARE (Things that run before your routes)

// Allow JSON data in requests
app.use(express.json());

// Allow form data in requests
app.use(express.urlencoded({extended : true}));



// connect to our Database 
connectToDB();

// Import Routes 
const productRoutes = require('./routes/product-routes.js')

const categoryRoutes = require('./routes/category-routes.js');


// use Product  Routes 
app.use('/api/products' , productRoutes);

// use category routes
app.use('/api/categories' , categoryRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to E-Commerce API!',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories'  // NEW
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});