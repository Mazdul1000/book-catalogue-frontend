import React, { useState } from 'react';
import { Button } from './ui/button';
import { useGetAllReiewsQuery } from '../redux/features/review/reviewApi';
import { useParams } from 'react-router-dom';

type IReview = {
    _id: string;
    user: {
        username: string,
        avatar: string,
    },
    bookId: string
    message: string
}

const Reviews = () => {
    const { bookId} = useParams()
    const [newReview, setNewReview] = useState('');

    const { data, isLoading, isError} = useGetAllReiewsQuery(bookId);

  console.log(data)
    const handleSubmitReview = async () => {
      if (newReview.trim() === '') {
        return;
      }
  
      // Assuming addReviewMutation.mutateAsync is used to add a new review
  
      // Clear the textarea
      setNewReview('');
    };

    if(isLoading){
      return <div></div>
    }

    return (
        <div className="mt-8 px-12">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {/* Add new review */}
        <div className="mb-4 flex justify-start items-center gap-3">
          <textarea
            className="w-1/2 resize-none px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-main"
            placeholder="Write a review..."
            value={newReview}
            rows={2}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <Button
            variant= "default"
            className="mt-2 py-2 px-4 bg-primary-main border bg-indigo-500 hover:bg-indigo-700 text-white  font-semibold"
            onClick={handleSubmitReview}
          >
            Add Review
          </Button>
        </div>

        {/* List of reviews */}
        <div className="grid gap-4">
          {/* Mapping through reviews */}
          {data.data.map((review:IReview) => (
            <div key={review._id} className="flex w-1/2 shadow-[inset_-12px_-8px_40px_#46464620] bg-indigo-100 p-4 rounded-lg">
            <div className="mr-4">
              {/* Assuming avatar image */}
              <img src={review.user.avatar} alt={review.user.username} className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-grow">
              <p className="font-semibold">{review.user.username}</p>
              <p className="mt-1">{review.message}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    );
};

export default Reviews;