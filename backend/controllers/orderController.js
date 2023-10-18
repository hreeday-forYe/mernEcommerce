import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/* ---------------------------------------------------------------
ORDER ROUTES- Create New Order by the logged in user and get orders made by the users
-------------------------------------------------------------- */

// @desc - Create New Order all Products
// @route - POST /api/orders
// @access - PRIVATE /Users
const addOrderItems = asyncHandler(async (req, res) => {
  const {orderItems,
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      taxPrice, 
      shippingPrice,
      totalPrice} = req.body
    
  
});

// @desc - Get Logged in user orders
// @route - GET /api/orders/myorders
// @access - PRIVATE / Users
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("Get My order Items");
});

// @desc - Get Order By Id (Single Order)
// @route - GET /api/orders/:id
// @access - PRIVATE / Users
const getOrderById = asyncHandler(async (req, res) => {
  res.send("Get Order By Id");
});

// @desc - Update the order to be marked as paid (Different Orders)
// @route - GET /api/orders/:id/pay
// @access - PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update Order To Paid");
});

// @desc - Update the order to be marked as Delivered (Different Orders)
// @route - GET /api/orders/:id/deliver
// @access - PRIVATE  /ADMIN
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update Order To Delivered");
});


// @desc - Get All the orders
// @route - GET /api/orders
// @access - PRIVATE / Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get All orders");
});


export {
  addOrderItems,
  getMyOrders, 
  getOrderById, 
  updateOrderToPaid, 
  updateOrderToDelivered, 
  getOrders
}; 