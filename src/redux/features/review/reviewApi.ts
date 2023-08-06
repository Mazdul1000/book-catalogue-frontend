import { api } from "../../api/apiSlice";

const reviewApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addReview: builder.mutation({
            query: ( data ) => ({
                url: '/reviews/add-new',
                method: 'POST',
                body: data
            })
        }),
        getAllReiews: builder.query({
            query: (bookId) => `reviews/${bookId}`
        })
    })
})

export const { useAddReviewMutation, useGetAllReiewsQuery} = reviewApi;