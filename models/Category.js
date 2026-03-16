const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    sparse: true
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

categorySchema.pre('save', async function() {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);