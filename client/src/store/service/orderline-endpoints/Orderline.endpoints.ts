import RootApi from "../Root.api";

const OrderlineEndpoints = RootApi.injectEndpoints({
  endpoints: (builder) => ({


  
    updateOrderStatus: builder.mutation({
      query: ({id,data}) => ({
        url: `/orderline/update?id=${id}`,
        body: data,
        method: "PATCH",
      }),
    }),

  }),
});

export const { useUpdateOrderStatusMutation } = OrderlineEndpoints;
