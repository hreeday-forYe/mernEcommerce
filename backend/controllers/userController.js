import User from "../models/userModel.js"
import asyncHandler from "../middleware/asyncHandler.js"
import generateToken from "../utils/generateToken.js"

/* --------------------------------------------------------------------------------
USER ROUTES : ROUTES USERS CAN ACCESS PUBLICLY: REGISTER AND LOGIN
----------------------------------------------------------------------------------- */

// @desc --> Auth User and Get Token
// @Route --> POST api/users/login
// access --> public
const authUser = asyncHandler(async(req, res)=>{
  const {email, password} = req.body

  // Checking if the data base user has that user with the entered email or not 
  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))){

    // Calling the function that generates the token passing the res object and userId
    generateToken(res, user._id)

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  }else{
    res.status(401);
    throw new Error('Invalid email or password')
  }


})


// @desc --> Register user 
// @Route --> POST api/users
// access --> public
const registerUser = asyncHandler(async(req, res)=>{
  const {name, email, password} = req.body
  const userExist = await User.findOne({email})
  if(userExist){
    res.status(400)
    throw new Error("User already exists")
  }
  const user = await User.create({
    name, 
    email,
    password
  })

  if(user){
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  }else{
    res.status(400);
    throw new Error("Invalid user Data")
  }
})


/* --------------------------------------------------------------------------------
USER ROUTES : FOR PRIVATE/AUTHORIZED USERS: GET PROFILE, UPDATE PROFILE AND LOGOUT 
----------------------------------------------------------------------------------- */


// @desc --> Logout user / clear cookie
// @Route --> POST api/users/logout
// access --> private
const logoutUser = asyncHandler(async(req, res)=>{
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({message: "logged out successfully"})
})


// @desc --> Get user Profile
// @Route --> GET api/users/profile
// access --> private
const getUserProfile = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id)

  if(user){
    res.status(200).json({
      _id:user._id,
      name: user.name,
      email: user.email,
      isAdmin:user.isAdmin,
    })
  }else{
    res.status(404).json({message: "User Not Found"})
  }
})


// @desc --> Update user Profile
// @Route --> PUT api/users/profile
// access --> private
const updateUserProfile = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id)
  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
// There is seperate checking for the password cause password is hassed which is in the database mess only if it is being updated
    if(req.body.password){
      user.password = req.body.password
    }

    const updatedUser = await user.save(); // Returns user data that is saved currently and saves to updatedUser
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    }); 
  }else{
    // Error 
    res.status(404)
    throw new Error("User not Found")
  }

})

/* -------------------------------------------------------------------------------------
ADMIN ACCESS FOR USERS ROUTES : GET SINGLE USER, GET ALL USERS, UPDATE USER, DELTE USER
---------------------------------------------------------------------------------------- */


// @desc --> Get all Users
// @Route --> GET api/users
// access --> private /Admin
const getUsers = asyncHandler(async(req, res)=>{
  res.send("Get Users ")
})

// @desc --> Get User by id
// @Route --> GET api/users/:id
// access --> private /Admin
const getUserById = asyncHandler(async(req, res)=>{
  res.send("Get user by id ")
})

// @desc --> Delete Users
// @Route --> DELETE api/users/:id
// access --> private /Admin
const deleteUser = asyncHandler(async(req, res)=>{
  res.send("Delete User ")
})

// @desc --> UPDATE User by ud
// @Route --> PUT api/users/:id
// access --> private /Admin
const updateUser = asyncHandler(async(req, res)=>{
  res.send("update User ")
})



export {
  authUser, 
  registerUser,
  logoutUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers, 
  deleteUser, 
  getUserById, 
  updateUser
}