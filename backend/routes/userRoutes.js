import express from "express"
import User from "../models/userModel";
import asyncHandler from "../middleware/asyncHandler";
import { getUsers, getUserById } from "../controllers/userController";

router = express.Router();



// get all the users
router.route("/").get(getUsers)

// get the single user using the id
router.route("/:id").get(getUserById);

