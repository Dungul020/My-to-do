// import mongoose from "mongoose";
// import dotenv from 'dotenv';

// dotenv.config();

// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.DB_MONGO_URL);
//     console.log("Succesfully connected to mongodb");
//   } catch (error) {
//     console.log("Error connecting to mongoDB:", error);
//   }
// }



// export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_MONGO_URL, {
      useNewUrlParser: true, // Fix deprecated URL parser warning
      useUnifiedTopology: true, // Fix deprecated Server Discovery warning
      writeConcern: { w: "majority" }, // Fix deprecated `w` option
    });

    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
}

export default connectDB;
