import {apiSlice} from './apislice'
import { ORDERS_URL } from '../constant'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) =>({
        url: `${ORDERS_URL}`,
        method: 'POST',
        body: {...order},
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) =>({
        url: `${ORDERS_URL}/${orderId}`
      }),
      keepUnusedDataFor: 5
    }),
  }),
})

export const {useCreateOrderMutation} = ordersApiSlice