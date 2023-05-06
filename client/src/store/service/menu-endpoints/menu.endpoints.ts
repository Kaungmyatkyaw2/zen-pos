import RootApi from "../Root.api";

const MenuEndpoints = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    createMenuItem: builder.mutation({
      query: (data) => ({
        url: "/menu_items/create",
        method: "POST",
        headers: {
          "Conten-Type": "multipart/form-data",
        },
        body: data,
      }),
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/menu_items/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
    updateMenuItem: builder.mutation({
      query: ({ id, data }) => ({
        headers: {
          "Conten-Type": "multipart/form-data",
        },
        url: `/menu_items/update?id=${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
} = MenuEndpoints;
