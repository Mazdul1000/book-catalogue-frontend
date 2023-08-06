import React, { useState } from 'react';
import { Button } from './ui/button';

const Reviews = () => {

    const reviews = [
        {
          id: 1,
          user: {
            username: 'user1',
            avatar: 'https://via.placeholder.com/50', // Replace with actual avatar URL
          },
          message: 'This book was amazing! Highly recommended.',
        },
        {
          id: 2,
          user: {
            username: 'user2',
            avatar: 'https://via.placeholder.com/50', // Replace with actual avatar URL
          },
          message: 'I enjoyed reading this book. Great plot and characters.',
        },
        {
          id: 3,
          user: {
            username: 'user3',
            avatar: 'https://via.placeholder.com/50', // Replace with actual avatar URL
          },
          message: 'Not my favorite book, but still a decent read.',
        },
        // Add more dummy reviews here
      ];
      

    const [newReview, setNewReview] = useState('');

  
    const handleSubmitReview = async () => {
      if (newReview.trim() === '') {
        return;
      }
  
      // Assuming addReviewMutation.mutateAsync is used to add a new review
  
      // Clear the textarea
      setNewReview('');
    };

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
          {reviews.map((review) => (
            <div key={review.id} className="flex w-1/2 shadow-[inset_-12px_-8px_40px_#46464620] bg-indigo-100 p-4 rounded-lg">
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