import RootApi from "../Root.api";

const OrderEndpoints = RootApi.injectEndpoints({
  endpoints: (builder) => ({


    getOrders: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        body: data,
        method: "POST",
      }),
    }),

    updateOrderStatus: builder.mutation({
      query: ({id,data}) => ({
        url: `/order/update?id=${id}`,
        body: data,
        method: "PATCH",
      }),
    }),

  }),
});

export const { useCreateOrderMutation,useLazyGetOrdersQuery,useUpdateOrderStatusMutation } = OrderEndpoints;
