import React, { useState } from 'react';
import { FaBook, FaHome, FaInfoCircle, FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface NavbarProps {
  // Add any props you might need here
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-blue-600 p-4">
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
          <Link to={'/'} className="text-white mx-4">
            <FaHome className="inline mr-2" />
            Home
          </Link>
          <a href="#" className="text-white mx-4">
            <FaInfoCircle className="inline mr-2" />
            About
          </a>
          <Link to="/books" className="text-white mx-4">
            <FaPhone className="inline mr-2" />
            Contact
          </Link>
          {/* Add more links here */}
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
          <a href="#" className="block text-white my-2">
            <FaHome className="inline mr-2" />
            Home
          </a>
          <a href="#" className="block text-white my-2">
            <FaInfoCircle className="inline mr-2" />
            About
          </a>
          <a href="#" className="block text-white my-2">
            <FaPhone className="inline mr-2" />
            Contact
          </a>
          {/* Add more links here */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;