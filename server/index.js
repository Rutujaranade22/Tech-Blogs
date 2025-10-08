import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import {
  getBlogForSlug,
  getBlogs,
  patchPublishBlog,
  postBlogs,
  putBlogs,
} from "./controllers/blog.js";
import { postLogin, postSignup } from "./controllers/user.js";
import Blog from "./models/Blog.js";

dotenv.config();  

const app = express();
app.use(express.json());
app.use(cors());
 
const connectDB = async () => {
  try {
    console.log("🔎 MONGO_URL from .env:", process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

 
const jwtCheck = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: "Authorization token missing" });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid JWT Token" });
  }
};

 
const increaseViewCount = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (blog) {
      blog.viewCount += 1;
      await blog.save();
    }
  } catch (error) {
    console.error("Error increasing view count:", error);
  }
  next();
};

 
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is up and running..." });
});

app.post("/signup", postSignup);
app.post("/login", postLogin);
app.get("/blogs", getBlogs);
app.get("/blogs/:slug", increaseViewCount, getBlogForSlug);
app.post("/blogs", jwtCheck, postBlogs);
app.patch("/blogs/:slug/publish", jwtCheck, patchPublishBlog);
app.put("/blogs/:slug", jwtCheck, putBlogs);

 
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
