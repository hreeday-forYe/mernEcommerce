import express from "express";
import dotenv from 'dotenv';
import products from "./data/products.js"; // we need to use .js for our own modules
import connectDB from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 5000;


connectDB(); // we are trying to make connection with database

const app = express();

app.get("/",(req, res)=>{
  res.send("API is running...")
})

app.get("/api/products", (req,res)=>{
  res.json(products);
})

// route for single product
app.get("/api/products/:id", (req, res)=>{
  // what does this line do? this line basically loops through the each product in the array and returns the product whoose _id is equal to the id from the req.params.id
  const product = products.find((p)=>p._id ===req.params.id);
  res.json(product);
})

app.listen(port, ()=>console.log(`Server running on port: ${port}`))