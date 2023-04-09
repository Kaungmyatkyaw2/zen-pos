import RootApi from "../Root.api";

const CategoryEndpoints = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    getOptions: builder.query({
      query: () => ({
        url: "/options",
        method: "GET",
      }),
    }),
    createOptions: builder.mutation({
      query: (data) => ({
        url: "/options/create",
        body: data,
        method: "POST",
      }),
    }),

    updateOption: builder.mutation({
      query: ({id,data}) => ({
        url: `/options/update?id=${id}`,
        body: data,
        method: "PATCH",
      }),
    }),

    deleteOption: builder.mutation({
      query: (id) => ({
        url: `/options/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOptionsMutation,
  useLazyGetOptionsQuery,
  useDeleteOptionMutation,
  useUpdateOptionMutation
} = CategoryEndpoints;
