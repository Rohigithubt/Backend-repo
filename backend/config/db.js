const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.VITE_MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch (error){
      console.log(`Error ${error.message}`);
      process.exit(1);
    }
};

module.exports = connectDB;