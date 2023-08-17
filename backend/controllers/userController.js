import User from "../models/userModel";
import asyncHandler from "../middleware/asyncHandler";

// @desc --> Get all the users from database
// @Route --> api/users
// access --> private Admin
const getUsers = asyncHandler(async(req, res)=>{
    const users = await User.find({});
    res.json(users);
})


// @desc --> Get Single User from database
// @Route --> api/users/:id
// access --> private Admin
const getUserById = asyncHandler(async(req, res)=>{
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    res.status(404);
    throw new Error ("User Not Found")
  }
})

export {getUsers, getUserById}