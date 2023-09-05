import { PRODUCTS_URL } from "../constant";
import { apiSlice } from "./apislice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) =>({
    getProducts: builder.query({
      query: ()=> ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// exporting our query 
export const { useGetProductsQuery } = productsApiSlice;
