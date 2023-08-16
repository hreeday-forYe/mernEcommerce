import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import users from "./data/users.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import chalk from 'chalk';

dotenv.config();
await connectDB();

const importData = async () =>{
  try {
    // before importing any data we have to delete everything from our collection of Order, Product and User
    await Order.deleteMany(); 
    await Product.deleteMany(); 
    await User.deleteMany();

    // Inserting the users in our User collection 
    const createdUsers = await User.insertMany(users);
    // getting our admin user ID who will be the owner of all the products 
    const adminUser = createdUsers[0]._id; 

    // inserting the products
    const sampleProducts = products.map((product)=>{
      return {...product, user:adminUser}
    });

    // console.log(sampleProducts);

    // adding the products
    await Product.insertMany(sampleProducts);

    console.log(chalk.bgGreen("Data Imported Successfully !"));
    process.exit();
  } catch (error) {
    console.error(`${error}`)
    process.exit(1);
  }
}


const destroyData = async ()=>{
  try {
    // these three lines will destroy everything in our database
    await Order.deleteMany(); 
    await Product.deleteMany(); 
    await User.deleteMany();

    //
    console.log(chalk.bgRed("Data Destroyed Successfully!"));
    process.exit()
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
}

// now we need to choose which function to run in case we run this file for this our logic 
// will be to check for the passed parameter passed while running the file

// command to run the file : node backend/seeder.js -d --> this is the command passed with -d parameter

// this parameter can be accessed with the help of 

// process.argv --> this will returns the array of path and all but at the last index of it there will be the path we send

if (process.argv[2] === "-d"){
  destroyData();
}else{
  importData();
}