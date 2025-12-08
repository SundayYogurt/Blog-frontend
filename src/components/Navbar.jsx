import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold">
              My Awesome Blog
            </NavLink>
          </div>
          <div className="flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg ${
                  isActive ? 'font-bold text-primary' : 'hover:text-primary'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-lg ${
                  isActive ? 'font-bold text-primary' : 'hover:text-primary'
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `text-lg ${
                  isActive ? 'font-bold text-primary' : 'hover:text-primary'
                }`
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/create-post"
              className="btn btn-primary"
            >
              Create Post
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;