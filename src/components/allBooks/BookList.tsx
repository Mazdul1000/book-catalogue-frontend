import React from 'react';
import { useAppSelector } from '../../redux/hook';
import { useGetBooksQuery } from '../../redux/api/apiSlice';
import Footer from '../../layouts/Footer';
import { IBook } from '../home/bookGrid/BookGrid';

const BookList = () => {

    const {data, isLoading} = useGetBooksQuery(undefined);

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col  overflow-auto px-10">
        <table className="min-w-full divide-y divide-gray-200 flex-grow">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thumbnail
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Genre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publication Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
            {data.data.map((book:IBook) => (
              <tr key={book._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={book.thumbnail} alt={book.title} className="h-full w-10" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{book.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{book.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{book.genre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{book.publicationDate}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Footer />
      </div>
    );
};

export default BookList;