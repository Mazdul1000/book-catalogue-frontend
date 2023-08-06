import { api } from "../../api/apiSlice";

export const bookApi = api.injectEndpoints({
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
          }),
          editBook: builder.mutation({
            query: (data) => ({
              url: `/books/edit-book/${data.bookId}`,
              method: 'PATCH',
              body: data.data
            })
          })
    })
})

export const { useGetBooksQuery, useGetSingleBookQuery, useAddNewBookMutation,useEditBookMutation } = bookApi;