import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RootApi = createApi({
  reducerPath: "Api",
  tagTypes: ["update"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333",
    prepareHeaders: (header) => {
      localStorage.getItem("pos_at")
        ? header.set(
            "authorization",
            `Bearer ${localStorage.getItem("pos_at")}`
          )
        : header.delete("authorization");
    },
  }),
  endpoints: (builder) => ({}),
});

export default RootApi;
