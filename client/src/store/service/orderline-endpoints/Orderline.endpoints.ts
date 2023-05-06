import RootApi from "../Root.api";

const OrderlineEndpoints = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderlineStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orderline/updateOrderlineStatus?id=${id}`,
        body: data,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useUpdateOrderlineStatusMutation } = OrderlineEndpoints;
