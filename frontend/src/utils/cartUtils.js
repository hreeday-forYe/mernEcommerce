// helperfunctioins that will format and add decimals properly
export const addDecimals = (num) =>{
  return (Math.round(num *100)/ 100).toFixed(2);
}


// function to update the cart
export const updateCart = (state)=>{
  
      // Checking for the price and calculating the price of the items price
      // calculating the items price
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0 ))

      // calculating the shipping price (if order is over $100 then free, else $10 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 100? 0 : 10)
      
      // calculating the tax price (15 percent tax)
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

      // calculating the total price
      state.totalPrice = (
        Number(state.itemsPrice) + 
        Number(state.shippingPrice)+
        Number(state.taxPrice)
      ).toFixed(2)

      // Saving the price and everything to the local storage
      localStorage.setItem('cart', JSON.stringify(state))

      // returning the state
      return state
}