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
        totalPrice,
  } = req.body
  
  // Check if there is an orderItems array or not
  if(orderItems && orderItems.length === 0){
    res.status(400);
    throw new Error("No order Items");
  }else{
    const order = new Order({
      orderItems: orderItems.map((x)=>({...x,product: x._id, _id:undefined})), 
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
  
});

// @desc - Get Logged in user orders
// @route - GET /api/orders/myorders
// @access - PRIVATE / Users
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})
  res.status(200).json(orders)
});

// @desc - Get Order By Id (Single Order)
// @route - GET /api/orders/:id
// @access - PRIVATE / Users
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email')

  if(order){
    res.status(200).json(order);
  }else{
    res.status(404)
    throw new Error('Order not Found')
  }
});

// @desc - Update the order to be marked as paid (Different Orders)
// @route - GET /api/orders/:id/pay
// @access - PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update Order To Paid")
});

// @desc - Update the order to be marked as Delivered (Different Orders)
// @route - GET /api/orders/:id/deliver
// @access - PRIVATE  /ADMIN
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update Order To Delivered")
});


// @desc - Get All the orders
// @route - GET /api/orders
// @access - PRIVATE / Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get All orders")
});


export {
  addOrderItems,
  getMyOrders, 
  getOrderById, 
  updateOrderToPaid, 
  updateOrderToDelivered, 
  getOrders
}