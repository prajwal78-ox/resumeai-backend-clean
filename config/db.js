import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "resumeai",
    });

    console.log("📦 MongoDB Connected");
    console.log(`📍 Host: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
    process.exit(1);
  }
}
