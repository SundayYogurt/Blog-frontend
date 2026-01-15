import React, { useState } from 'react';
import { NavLink } from 'react-router';
import {
  RiHomeLine,
  RiLoginBoxLine,
  RiUserAddLine,
  RiAddCircleLine,
  RiMenu3Line,
  RiCloseLine,
} from 'react-icons/ri';

const Navbar = () => {
  const [hide, setHide] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { text: 'Home', to: '/', icon: <RiHomeLine /> },
    { text: 'Login', to: '/login', icon: <RiLoginBoxLine /> },
    { text: 'Register', to: '/register', icon: <RiUserAddLine /> },
    {
      text: 'Create Post',
      to: '/create-post',
      icon: <RiAddCircleLine />,
      isButton: true,
    },
  ];

  const renderNavLink = (item, isMobile = false) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={() => isMobile && setIsMenuOpen(false)}
      className={({ isActive }) => {
        const baseClasses = 'flex items-center gap-2';
        if (item.isButton) {
          return `${baseClasses} ${
            isMobile
              ? 'justify-center w-full text-center btn btn-primary mt-2'
              : 'btn btn-primary'
          }`;
        }
        return `${baseClasses} ${
          isMobile
            ? `py-2 text-lg ${
                isActive ? 'font-bold text-primary' : 'hover:text-primary'
              }`
            : `text-lg ${
                isActive ? 'font-bold text-primary' : 'hover:text-primary'
              }`
        }`;
      }}
    >
      {item.icon}
      <span>{item.text}</span>
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold">
              SE NPRU BLOG
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => renderNavLink(item))}
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost text-2xl"
            >
              {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col items-start space-y-2">
            {menuItems.map((item) => renderNavLink(item, true))}  
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;