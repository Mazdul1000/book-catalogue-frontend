// BookGrid.tsx

import React, { useEffect, useState } from 'react';
import { Card } from '../../ui/card';
import { format } from 'date-fns';
import { useGetBooksQuery } from '../../../redux/features/book/bookApi';


export interface IBook {
  _id: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}


const BookGrid = () => {
    const [sortedBooks, setSortedBooks] = useState<IBook[]>([]);
  const { data, isLoading } = useGetBooksQuery(undefined);

  useEffect(() => {
    if (!isLoading && data.data.length !== 0) {
      const sortedList = [...data.data].sort((a: IBook, b: IBook) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      setSortedBooks(sortedList);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='py-16 px-10'>
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
    New Arrivals
    </h2>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10">
      {sortedBooks
      .slice(0, 10)
      .map((book: IBook) => (
        <Card key={book._id} className="h-full flex">
          <div className="w-1/3 p-4">
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-[100%] object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-2/3 p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
            <p className="text-sm text-gray-600 mb-2">Genre: {book.genre}</p>
            <p className="text-sm text-gray-600">Publication Date: {format(new Date(book.publicationDate), "MMMM d, yyyy")}</p>
          </div>
        </Card>
      ))}
    </div>
  </div>
  );
};

export default BookGrid;