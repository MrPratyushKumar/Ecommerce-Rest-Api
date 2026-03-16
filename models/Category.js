// Category Example:
// ├── Name: "Electronics"
// ├── Description: "All electronic items"
// ├── Slug: "electronics" (for URL)
// └── Image: "category-image.jpg"

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,  // No duplicate category names
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  
  slug: {
    type: String,
    unique: true,
    lowercase: true
    // Auto-generated from name
  },
  
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  
  image: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
  
}, {
  timestamps: true
});

// Auto-generated slug before saving

categorySchema.pre('save', function(next) {
 if(this.isModified('name')){
  this.slug = this.name
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
 } 
 next();
})

module.exports = mongoose.model('Category' , categorySchema);