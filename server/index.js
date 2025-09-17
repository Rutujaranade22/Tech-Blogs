import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config(); // load .env

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    // Debug log to confirm env is loading
    console.log("🔎 MONGO_URL from .env:", process.env.MONGO_URL);

    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is up and running...",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  await connectDB();
});
