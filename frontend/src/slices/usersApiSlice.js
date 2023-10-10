import { USERS_URL } from "../constant";
import { apiSlice } from "./apislice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) =>({
    login: builder.mutation({
      query: (data)=> ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      }),
    }),
    register: builder.mutation({
      query: (data)=>({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: ()=>({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    })
    
  }),
});

// exporting our query 
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = usersApiSlice;
