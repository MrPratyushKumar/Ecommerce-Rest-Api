const Category = require("../models/Category.js");

// 1. GET ALL CATEGORIES

const getAllCategories = async (req, res) => {
  try {
    // get all active categories
    const allActiveCategories = await Category.find({ isActive: true });
    if (allActiveCategories.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of all Active Categories Fetched Successfully",
        count: allActiveCategories.length,
        Data: allActiveCategories,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Active Categories Found in this E-commerce website",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong! Please try again sometime",
    });
  }
};

const getSingleCategoryByID = async (req , res)=>{
  try {
    const getCurrentCategoryId = req.params.id;
    const categoryDetailsById = await Category.findById(getAllCategories);
    if(!categoryDetailsById){
      // Not Found category
      res.status(404).json({
        success : false,
        message : 'Category with current Id is not Found! Please try with different ID'
      })
    } 
    // Found 
    res.status(200).json({
      success : true,
      data : categoryDetailsById
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong! Please try again sometime",
    });
  }
}

const createNewCategory = async (req , res)=> {
  try {
    const newCategoryFormData = req.body;
    const newlyCreatedCategory = await Category.create(newCategoryFormData);
    if(!newlyCreatedCategory){
      // not created 
      res.status(404).json({
        success : false,
        message:'does not get Form data from req.body'
      })
    }
    // created
    res.status(202).json({
      success : true,
      message : "Category added successfully",
      data : newlyCreatedCategory
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong! Please try again sometime",
    });
  }
}

const updateCategory = async(req , res)=> {
  try {
    const updateCategoryFromData = req.body;
    const getCurrentCategoryId = req.params.id;
    const updatedCategory = await Category.findByIdAndUpdate(getAllCategories , updateCategoryFromData , {
      new : true
      // This will get the updated category data
    }
  )
  if(!!updatedCategory){
    // CAtegory is not Found 
    res.status(404).json({
      success : false,
      message : 'Category is not Found with This ID'
    })
  }
  // category is found 
  res.status(200).json({
    success : true,
    message : 'Category updated Successfully',
    data : updatedCategory
  })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong! Please try again sometime",
    });
  }
}

