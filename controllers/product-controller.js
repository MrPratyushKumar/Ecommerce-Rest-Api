// Import the product model
const Product = require("../models/Product.js");

//  FUNCTION 1: Get all products
const getAllProducts = async (req, res) => {
  try {
    // get all products form the database
    const allProducts = await Product.find({});
    if (allProducts.length > 0) {
      // Send response to User
      res.status(200).json({
        success: true,
        message : 'List of all products fetched Successfully from the Database',
        count:allProducts.length,
        data : allProducts
      })
    } else {
      res.status(404).json({
        success : false ,
        message : "No Products found"
      })
    }
  } catch (error) {
    // If something goes wrong
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something Went Wrong! Please try again sometime",
      error: error.message,
    });
  }
};


// FUNCTION 2: Get single product by ID

const getSingleProductByID = async (req , res)=> {
  try {
    // get the ID from the URL 
    // // Example: /api/products/12345 → req.params.id = "12345"
    const getCurrentProductId = req.params.id;
    // find product in database 
    const productDetailById = await Product.findById( getCurrentProductId);
    // Check if product exists
    if(!productDetailById){
      // Not found 
      return res.status(404).json({
        success : false ,
        message : 'Product with the current Id is not Found! Please Try with The different ID'
      })
    }
    // Product found! Send it back
    res.status(200).json({
      success : true ,
      data : productDetailById

    })

    

  } catch (error) {
    // If something goes wrong
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something Went Wrong! Please try again sometime",
      error: error.message,
    });
  } 
}


// FUNCTION 3: Create new product

const createNewProduct = async (req , res)=>{
  try {
    // get data from user's request 
    // Example: {name : "iphone"  , price : 50000 , ....}
    const productData = req.body;

    //create product in the database
    const newlyCreatedProduct = await Product.create(productData)
    if(newlyCreatedProduct){
      // send success response 
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data : newlyCreatedProduct
      })
    }

    
  } catch (error) {
    // If something goes wrong
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something Went Wrong! Please try again sometime",
      error: error.message,
    });
  } 
}


// FUNCTION 4: Update product

const updateProduct = async (req , res)=>{
  try {
    const updateProductFromData = req.body;

    const getCurrentProductId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(getCurrentProductId , updateProductFromData , {
      new : true
      // This will get the updated Product data
    }
  )
  if(!updatedProduct){
    // Product is not found
    res.status(404).json({
      success : false ,
      message : 'Product is not Found with this ID'
    })
  }
  // Product is Found
  res.status(200).json({
    success : true,
    message : 'Product Updated successfully',
    data : updatedProduct
  }) 

    
  } catch (error) {
    // If something goes wrong
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something Went Wrong! Please try again sometime",
      error: error.message,
    });
  }
}


// FUNCTION 5: Delete product
const deleteProduct = async(req , res)=> {
  try {
    const getCurrentProductId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(getCurrentProductId);
    if(!deletedProduct){
      // Product is not found 
      res.status(404).json({
        success : false,
        message : 'Product is not Found with this ID'
      })
    }
    // product is Found 
    res.status(200).json({
      success : true,
      data : deletedProduct
    })
  } catch (error) {
    // If something goes wrong
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something Went Wrong! Please try again sometime",
      error: error.message,
    });
  }
}

// ==================================================
// Export all functions so routes can use them
// ==================================================
module.exports = {
  getAllProducts,
  getSingleProductByID,
  createNewProduct,
  updateProduct,
  deleteProduct
};