import React, { useContext, useState, useEffect } from 'react';
import logo from '../../assets/images/new2.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData, setUserData } = useContext(userContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'enabled';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logOut = () => {
    localStorage.removeItem('userToken');
    setUserData(null);
    setIsMenuOpen(false);
    navigate('register');
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 md:fixed top-0 inset-x-0 py-1 shadow-sm text-center capitalize z-50">
      <div className="container w-11/12 flex flex-col md:flex-row justify-between items-center my-3 text-gray-500 dark:text-gray-300">
        <div className="flex items-center text-xl justify-between w-full md:w-auto">
          <NavLink to="" className="border-none mx-3 w-40">
            <img src={logo} className="w-36" alt="Logo" />
          </NavLink>
          <button
            className="md:hidden text-gray-500 dark:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100 transform scale-100' : 'max-h-0 opacity-0 transform scale-95'
          } md:max-h-full md:opacity-100 md:transform md:scale-100 w-full justify-evenly md:flex md:items-center md:space-x-2 text-lg`}
        >
          {userData && (
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
              <li>
                <NavLink to="">Home</NavLink>
              </li>
              <li>
                <NavLink to="wishlist">Wish List</NavLink>
              </li>
              <li>
                <NavLink to="categories">Categories</NavLink>
              </li>
              <li>
                <NavLink to="brands">Brands</NavLink>
              </li>
            </ul>
          )}
          <ul className="flex space-x-2 justify-center text-black dark:text-gray-300 md:space-x-4 text-xl cursor-pointer md:mt-0">
            <li>
              <i className="fab fa-linkedin-in hover:text-white hover:bg-indigo-700 p-3 rounded-full"></i>
            </li>
            <li>
              <i className="fab fa-youtube hover:text-white hover:bg-red-600 p-3 rounded-full"></i>
            </li>
            <li>
              <i className="fab fa-twitter hover:text-white hover:bg-indigo-400 p-3 rounded-full"></i>
            </li>
            <li>
              <i className="fab fa-facebook-f hover:text-white hover:bg-indigo-600 p-3 rounded-full"></i>
            </li>
          </ul>
          <ul className="flex space-x-2 justify-center text-black dark:text-gray-300 md:space-x-4 mt-2 md:mt-0">
            {userData ? (
              <>
                <li className="cursor-pointer" onClick={logOut}>
                  <span>Logout</span>
                </li>
                <li>
                  <NavLink to="cart">
                    <button
                      type="button"
                      className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-full">
                        {cart ? cart.numOfCartItems : 0}
                      </span>
                    </button>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="m-5">
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full"
            >
              {darkMode ? (
                <i className="fas fa-sun  text-yellow-500"></i>
              ) : (
                <i className="fas fa-moon text-gray-800"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
