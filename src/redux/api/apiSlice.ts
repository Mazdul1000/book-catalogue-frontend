import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalogue-backend-kcv46f38k-mazdul1000.vercel.app/api/v1',
  }),
  endpoints: (builder) => ({}),
});