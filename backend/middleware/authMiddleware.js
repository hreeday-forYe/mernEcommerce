import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

/*
In this file there are two functions:

1.PROTECT MIDDLEWARE: Which basically protects some of the routes from the user who are not logged In.
2.ADMIN MIDDLEWARE: Which provides some extra functionalites to the users who are only admin.
*/

/* In Middleware function we have access to the req, res objects we can do what we can with those and the next object is also necessary which basically says this function is complete move on to the next one so call it at last */

const protect = asyncHandler(async(req, res,next)=>{
  let token
  // Read the jwt from the cookie
  token = req.cookies.jwt

  if(token){
    try {
      // Decode the token to get the userId
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user details except the password that matches the user ID and set it to the req object and user object
      req.user = await User.findById(decoded.userId).select("-password"); // Deletes the userID
      next()
    } catch (error) {
      console.error(error)
      res.status(401);
      throw new Error('Not authorized, Token Failed')
    }
  }else{
    res.status(401);
    throw new Error('Not Authorized, no Token')
  }
})


// ADMIN MIDDLEWARE:
const admin = (req, res, next) =>{
  if(req.user && req.user.isAdmin){
    next()
  }else{
    res.status(401)
    throw new Error("Not Authorized, As Admin")
  }
}

export {protect, admin} 