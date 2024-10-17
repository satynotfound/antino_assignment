const mongoose = require("mongoose");
require('dotenv').config(); 

const mongoURI = process.env.MONGODB_URI 

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Use the new connection string parser
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    });

    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if there is a connection error
  }
};

// Export the function to use in other parts of your app
module.exports = connectDB;
