import RootApi from "../Root.api";

const CategoryEndpoints = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "category/create",
        method: "POST",
        body: data,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "category",
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `category/update?id=${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/delete?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useLazyGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery
} = CategoryEndpoints;
