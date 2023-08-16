import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
// This will be the express Router import for our app
const router = express.Router();



router.get("/", asyncHandler(async(req,res)=>{
  const products = await Product.find({}); 
  res.json(products);
}));

// route for single product
router.get("/:id", asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id);
  if(product){
    return res.json(product);
  }
  res.status(404).json({message: "Product Not found"});
}))

export default router;