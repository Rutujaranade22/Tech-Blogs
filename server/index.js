import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config(); // load .env first

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("🔎 MONGO_URL from .env:", process.env.MONGO_URL); // debug
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is up and running...",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectDB();
});
