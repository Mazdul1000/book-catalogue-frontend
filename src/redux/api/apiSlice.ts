import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5002/api/v1',
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (filter) => {   
        const queryParams = [];
        for (const property in filter) {
          queryParams.push(`${property}=${encodeURIComponent(filter[property])}`);
        }
        const queryString = queryParams.join('&');
    
        return {
          url: `/books?${queryString}`,
          method: 'GET'
        };
      },
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addNewBook: builder.mutation({
        query: (data) => ({
            url: '/books/add-book',
            method: 'POST',
            body: data
        })
    })
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery, useAddNewBookMutation } = api;