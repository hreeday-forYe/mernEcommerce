// The parent to our other api slices

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../constant';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

// creating our api slice
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder)=>({}),
})

