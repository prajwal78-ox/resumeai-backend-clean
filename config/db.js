import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
    console.log(
      "MONGO_URI starts with:",
      process.env.MONGO_URI?.substring(0, 15)
    );

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};
