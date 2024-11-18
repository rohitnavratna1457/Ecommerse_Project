import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <FaSearch className="h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="ml-2 px-4 py-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <FaBell className="h-6 w-6 text-gray-500" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center">
            <FaUserCircle className="h-8 w-8 text-gray-500" />
            <span className="ml-2 text-sm font-medium text-gray-700">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 