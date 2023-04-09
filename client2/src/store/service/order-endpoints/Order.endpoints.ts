import RootApi from "../Root.api";

const OrderEndpoints = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = OrderEndpoints;
