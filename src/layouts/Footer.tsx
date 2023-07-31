import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white flex items-center justify-between py-4 text-center px-16">
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BookQuest. All rights reserved.
      </p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
          Terms
        </a>
        <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
          FAQ
        </a>
        <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
          Privacy
        </a>
        <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
          DMCA
        </a>
      </div>
    </footer>
  );
};

export default Footer;






