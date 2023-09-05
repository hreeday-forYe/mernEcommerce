import { configureStore } from "@reduxjs/toolkit";
// now adding our apislice to our store
import { apiSlice } from "./slices/apislice";

const store = configureStore({
  reducer:{
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Now adding the middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true,
})

export default store;