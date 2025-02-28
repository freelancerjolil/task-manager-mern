import React, { useContext, useEffect, useState } from 'react';
import {
  FaBars,
  FaBell,
  FaCog,
  FaExclamationCircle,
  FaMoon,
  FaSearch,
  FaSun,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Apply dark mode globally based on the theme state
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    // Add smooth transition for background and text color
    document.body.style.transition =
      'background-color 0.5s ease-in-out, color 0.5s ease-in-out';
    localStorage.setItem('theme', theme); // Save the selected theme
  }, [theme]);

  // Toggle theme between dark and light
  const handleThemeToggle = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme); // Save the selected theme in localStorage
      return newTheme;
    });
  };

  // Handle Logout
  const handleLogOut = () => {
    logOut();
    setModalOpen(false);
  };

  return (
    <nav className="bg-white shadow-black/30 mb-[2px] dark:bg-gray-900 shadow p-4 transition-all">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        {/* Middle: Search Box */}
        <div className="hidden md:flex relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500 dark:text-white" />
        </div>

        {/* Right: Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handleThemeToggle}
            className="text-gray-700 dark:text-white"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button className="text-gray-700 dark:text-white">
            <FaExclamationCircle size={20} />
          </button>
          <button
            className="text-gray-700 dark:text-white relative"
            onClick={() => setNotificationModalOpen(true)}
          >
            <FaBell size={20} />
          </button>
          <button className="text-gray-700 dark:text-white">
            <FaCog size={20} />
          </button>

          {/* Profile Icon */}
          {user ? (
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full border-2 ${
                  isOnline ? 'border-green-500' : 'border-red-500'
                } cursor-pointer`}
                onClick={() => setModalOpen(true)}
              >
                <img
                  src={
                    user.photoURL ||
                    'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <Link to={`/signIn`}>
              <button className="bg-[#FF7F00] text-white px-4 py-2 rounded">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Profile
            </h2>
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-200">
                {user?.displayName || 'User Name'}
                <br />
                {user?.email || 'User Email'}
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleLogOut}
              >
                Log Out
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
