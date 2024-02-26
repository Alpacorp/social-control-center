import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI ?? "");
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
}
