import express from 'express'
import {authUser, 
  registerUser,
  logoutUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers, 
  deleteUser, 
  getUserById, 
  updateUser } from '../controllers/userController.js'

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// get(getUsers)--Accessed By Admin
router.route('/').post(registerUser).get(protect, admin, getUsers) 

router.post('/logout', logoutUser)

router.post('/auth', authUser)

// This is the route accessed by logged in user: OWN PROFILE AND UPDATE OWN PROFILE
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


// Routes Accessed By Admin for single user GET:SINGLE USER, 
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)


export default router;

