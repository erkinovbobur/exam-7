import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();


  if (pathname.includes("/auth/login")) return null; 

  if (pathname.includes("/auth/signup")) return null; 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-black text-white w-full p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to='/'><img className='w-8 h-8' src="https://avatars.githubusercontent.com/u/33537152?v=4" alt="" /></Link>
        </div>

        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <div className="space-y-2">
              <span className={`block h-1 w-8 bg-red-600 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-1 w-8 bg-red-600 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-1 w-8 bg-red-600 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        <ul className="hidden lg:flex space-x-8">
          <li>
            <Link to="/" className="hover:text-red-600 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/auth/login" className="hover:text-red-600 transition duration-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/auth/signup" className="hover:text-red-600 transition duration-300">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`fixed inset-0 bg-black bg-opacity-90 text-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <button onClick={closeMenu} className="focus:outline-none mb-4">
            <div className="space-y-2">
              <span className={`block h-1 w-8 bg-red-600 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-1 w-8 bg-red-600 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-1 w-8 bg-red-600 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
          <ul className="space-y-6">
            <li>
              <Link to="/" className="block text-2xl hover:text-red-600 transition duration-300" onClick={closeMenu}>
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/auth/login" className="block text-2xl hover:text-red-600 transition duration-300" onClick={closeMenu}>
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </Link>
            </li>
            <li>
              <Link to="/auth/signup" className="block text-2xl hover:text-red-600 transition duration-300" onClick={closeMenu}>
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="block text-2xl hover:text-red-600 transition duration-300" onClick={closeMenu}>
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>


      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
