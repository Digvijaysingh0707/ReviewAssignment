import mongoose from "mongoose";
export const connectDB = async () => {
  const connectionString = process.env.DATABASE_URL;
  console.log(connectionString);
  let isConnected = false;
  while (!isConnected) {
    try {
      await mongoose.connect(connectionString);
      console.log("MongoDB connected");
      isConnected = true;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      console.log("Retrying connection in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds delay
    }
  }
};