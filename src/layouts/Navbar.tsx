import React, { useState } from 'react';
import { FaBook, FaHome, FaInfoCircle,  FaBars, FaTimes } from 'react-icons/fa';
import { GiBookshelf } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { logout } from '../redux/features/user/userSlice';



const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch()
  const { user } = useAppSelector( state => state.user)
  console.log(user)
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(logout());
    })
  }

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
         <Link to={'/'}>
         <span className="text-white font-bold text-xl flex items-center">
            <FaBook className="inline mr-2 text-2xl" />
            BookQuest
          </span>
         </Link>
        </div>
        <div className="hidden md:flex items-center">
          <Link to={'/'} className="text-white mx-4 flex items-center">
            <FaHome className="inline mr-2" />
           <span> Home</span>
          </Link>
          <Link to="/books" className="text-white mx-4 flex items-center">
            <GiBookshelf className="inline mr-2" />
            <span>All Books</span>
          </Link>
         { !user.email && <>
         <Link to={'/login'}>
          <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
          </Link>
         <Link to={'/login'}>
          <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
          </Link>
         </>}
       {user.email &&   <div>
          <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Logout                             
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
          </div>}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <Link to="/" className="block text-white my-2">
            <FaHome className="inline mr-2" />
            Home
          </Link>
          <Link to="/" className="block text-white my-2">
            <GiBookshelf className="inline mr-2" />
           <span> All Books</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;