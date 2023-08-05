import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsBank2 } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { BiBookBookmark } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { useGetSingleBookQuery } from '../redux/features/book/bookApi';
import { addToReadList, addWishlist } from '../redux/features/user/userThunk';

const BookDetails = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.user)
    const { bookId } = useParams();

    const { data, isLoading} = useGetSingleBookQuery(bookId)

    if(isLoading){
        return <div>Loading...</div>
    }

  const bookDetails = data.data;

  // add to wishlist
  const handleAddToWishlist = () => {
    if (!user.email) {
      return navigate('/login');
  }

  const bookId:string = bookDetails._id;

  if (user.wishlist && user.wishlist.includes(bookId)) {
      // If book is already in wishlist
      const updatedWishlist = user.wishlist.filter(id => id !== bookId);
      console.log("Book removed from wishlist");
      console.log(updatedWishlist);
      dispatch(addWishlist({userId: user._id!, userInfo: {wishlist: updatedWishlist}}))
  } else {
      // if book is not in the wishlist
      const updatedWishlist = [...(user.wishlist ?? []), bookId];
      console.log("Book added to wishlist");
      dispatch(addWishlist({userId: user._id!, userInfo: {wishlist: updatedWishlist}}))
  }
  }

  // add to Readlist
  const handleAddToReadlist = () => {
    if (!user.email) {
      return navigate('/login');
  }

  const bookId:string = bookDetails._id;

  if (user.readingList && user.readingList.includes(bookId)) {
    // Book is already in the readlist
    const updatedReadlist = user.readingList.filter(id => id !== bookId);
    console.log("Book removed from wishlist");
    console.log(updatedReadlist);
    dispatch(addToReadList({userId: user._id!, userInfo: {readingList: updatedReadlist}}))
} else {
    // if book is not in the readlist
    const updatedReadlist = [...(user.readingList ?? []), bookId];
    console.log("Book added to wishlist");
    dispatch(addToReadList({userId: user._id!, userInfo: {readingList: updatedReadlist}}))
}
  }

  return (
   <div className='w-full  flex justify-between px-20 pt-12' style={{ height: `calc(100vh - ${78}px)`}}>
    <div className='w-1/3 h-100'>
        <div className='w-full'><img className='w-full h-[35rem]' src={bookDetails.thumbnail} alt="" /></div>
        <div className='w-full flex justify-center gap-5 pt-3'>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleAddToWishlist}> {user.wishlist?.includes(bookDetails._id) ? "Remove from wishlist" : "Add to wishlist"}</button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleAddToReadlist}>{user.readingList?.includes(bookDetails._id) ? "Remove from Readlist" : "Add to Readlist"}</button>
        </div>
    </div>
    <div className='w-2/3 flex flex-col justify-between h-[35rem] px-5'>
      <div>
      <h2 className='text-3xl font-bold text-gray-700 text-center '> {bookDetails.title}</h2>
       <p className='text-center font-bold text-gray-500 pt-2'>By {bookDetails.author}</p>
       <p className='pt-10 font-serif text-left'>{bookDetails.description}</p>
      </div>
      <div className='flex w-full justify-between text-gray-600 font-semibold'>
      <p className='flex items-center gap-2'><BsBank2 /> <span>Publication: Penguin House</span></p>
        <p className='flex items-center gap-2'><SlCalender /> <span>Publication Date: {bookDetails.publicationDate}</span></p>
        <p className='flex items-center gap-2'><BiBookBookmark /> <span>Genre: {bookDetails.genre}</span></p>
        
      </div>
    </div>
   </div>
  );
};

export default BookDetails;