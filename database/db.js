const mongoose = require('mongoose');

const connectDB = async ()=>{
  try {
    await mongoose.connect("mongodb+srv://pratyushpandey14300_db_user:pratyushpandey14300@cluster0.cmbtvmp.mongodb.net/")
    console.log("mongodb is connected SuccessFully")
  } catch (error) {
    console.error('Mongodb connection failed' , error)
    process.exit(1)
  }
}

module.exports = connectDB;