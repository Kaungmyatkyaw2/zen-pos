import RootApi from "../Root.api";

const CompanyEndpoints = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCompany: builder.mutation({
      query: (data) => ({
        url: "/company/update",
        method: "PATCH",
        body: data,
      }),
    }),
    getCompany: builder.query({
      query: (id) => ({
        url: `/company?id=${id}`,
        method: "GET",
      }),
    }),
    getCompanies: builder.query({
      query: () => ({
        url: `/company/getCompanies`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateCompanyMutation,
  useLazyGetCompanyQuery,
  useLazyGetCompaniesQuery,
} = CompanyEndpoints;
