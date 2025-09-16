import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
 dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ||8080;

app.listen(PORT,()=>{
   console.log(`Server is runnning on port ${PORT}`); 
});