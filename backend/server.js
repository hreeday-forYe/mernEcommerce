import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

const port = process.env.PORT || 5000;

await connectDB(); // we are trying to make connection with database

const app = express();

// Body Praser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware--Adding this will help us read the req.cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Our router for the products requests will be handled by productRoutes file
app.use("/api/products", productRoutes);

// Our router for the Users requests will be handled by userRoutes file
app.use("/api/users", userRoutes);

// Our router for the Order requests will be handled by orderRoutes file
app.use("/api/orders", orderRoutes);

// using our error handler after all the routes
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
