import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

// This will be the express Router import for our app
const router = express.Router();



router.route("/").get(getProducts);

// route for single product
router.route("/:id").get(getProductById);

export default router;