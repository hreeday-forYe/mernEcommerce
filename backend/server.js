import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
dotenv.config();

const port = process.env.PORT || 5000;


connectDB(); // we are trying to make connection with database

const app = express();

app.get("/",(req, res)=>{
  res.send("API is running...")
})

// Our router for the products requests will be handled by productRoutes file
app.use("/api/products",productRoutes);

app.listen(port, ()=>console.log(`Server running on port: ${port}`))