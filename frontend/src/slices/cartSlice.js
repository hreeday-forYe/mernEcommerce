import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
// defining the inital State
// @Meaning first we check the cart in the local Storage if cart is available on local Storage then we get 
/* it using the localStorage.getItem("cart") and parse it using the JSON.parse to the object else localstorage doesnot have the item cart then leave it to be the empty object with the cartItems keys having the value of empty array. */

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  // Reducer object will have anthing that relates to the cart like add to Cart, delete Cart and soOn
  reducers:{
    // Now let's create a new function to add to cart: state is the (current)initialState of the cart and action will include any data inside of a payload. In this case we are sending and item to add to the cart which can be accessed by action.payload
    addToCart: (state, action)=>{
      const item = action.payload; // getting the item we are sending 

      // Check if the item is already in the cart
      const existItem =  state.cartItems.find((x)=>x._id === item._id);
      
      // if item exist update the quantity
      if(existItem){
        state.cartItems = state.cartItems.map((x)=>x._id === existItem._id ? item : x);
      }else{
        state.cartItems = [...state.cartItems, item]
      }
      return updateCart(state);
    },
    removeFromCart: (state,action)=>{
      state.cartItems = state.cartItems.filter((x)=>x._id !== action.payload);
      return updateCart(state); // updaging the cart after the items is removed
    }
  },
});

// inorder to use this export we have to pass the reducer function as action
export const { addToCart, removeFromCart } = cartSlice.actions;

// exporting all of our reducers for keeping it in the store js
export default cartSlice.reducer;