const express = require('express');

//create express router 
const router = express.Router();

// Import all controller function

const {
   getAllProducts,
  getSingleProductByID,
  createNewProduct,
  updateProduct,
  deleteProduct
} =  require('../controllers/product-controller.js');


// ==================================================
// DEFINE ALL ROUTES
// ==================================================

// get All Products 
// URL: GET /api/products
router.get('/' , getAllProducts);


// Get single product
// URL: GET /api/products/12345
router.get('/:id' , getSingleProductByID);

// Create new product
// URL: POST /api/products

router.post('/' , createNewProduct);

// Update product
// URL: PUT /api/products/12345
router.put('/:id' , updateProduct);

// Delete product
// URL: DELETE /api/products/12345

router.delete('/:id' , deleteProduct);

// Export all the Routers 
module.exports = router;