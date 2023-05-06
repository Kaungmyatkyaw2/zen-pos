import RootApi from "../Root.api";

const ChoiceEndpoints = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    createChoices: builder.mutation({
      query: ({ id, data }) => ({
        url: `choices/create?option_id=${id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateChoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `choices/update?id=${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    toggleChoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `choices/toggle?id=${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteChoice: builder.mutation({
      query: (id) => ({
        url: `choices/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useDeleteChoiceMutation,
  useCreateChoicesMutation,
  useUpdateChoiceMutation,
  useToggleChoiceMutation,
} = ChoiceEndpoints;
