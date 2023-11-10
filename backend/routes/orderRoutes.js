import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routing for the post request to the index of the order which is post-> add OrderItems Get ->get order items
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

// Getting the myorder
router.route("/mine").get(protect, getMyOrders);

// Getting the single Order as the user not as the admin user should be able to see there single order
router.route("/:id").get(protect, getOrderById);

// Payment Route
router.route("/:id/pay").put(protect, updateOrderToPaid);

// Update order to be marked as the delivered
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
