import mongoose from "mongoose";

export const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not defined");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "pi_labs",
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};
