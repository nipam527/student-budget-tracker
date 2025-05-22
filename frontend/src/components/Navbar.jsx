import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../main.jsx';
import { motion } from 'framer-motion';

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
    setIsOpen(false); // Close menu on logout
  };

  // Animation variants for the navbar
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav
      className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 p-4 shadow-xl sticky top-0 z-20 transform-gpu"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo/Title */}
        <motion.h1
          className="text-white text-2xl font-bold tracking-tight"
          whileHover={{ scale: 1.05 }}
        >
          Budget Tracker
        </motion.h1>

        {/* Hamburger Menu Icon (Visible on Mobile) */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <motion.svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </motion.svg>
          </button>
        </div>

        {/* Navigation Links */}
        <motion.div
          className={`w-full sm:w-auto sm:flex sm:items-center sm:space-x-4 mt-2 sm:mt-0 ${
            isOpen ? 'block' : 'hidden sm:flex'
          }`}
          variants={menuVariants}
          initial="hidden"
          animate={isOpen || window.innerWidth >= 640 ? 'visible' : 'hidden'}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block sm:inline-block text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                isActive ? 'bg-blue-700 shadow-inner' : ''
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
              Home
            </motion.span>
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/budget"
                className={({ isActive }) =>
                  `block sm:inline-block text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                    isActive ? 'bg-blue-700 shadow-inner' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                  Set Budget
                </motion.span>
              </NavLink>
              <NavLink
                to="/expenses"
                className={({ isActive }) =>
                  `block sm:inline-block text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                    isActive ? 'bg-blue-700 shadow-inner' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                  Add Expense
                </motion.span>
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block sm:inline-block text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                    isActive ? 'bg-blue-700 shadow-inner' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                  Dashboard
                </motion.span>
              </NavLink>
              {user.isAdmin && (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `block sm:inline-block text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                      isActive ? 'bg-blue-700 shadow-inner' : ''
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                    Admin Dashboard
                  </motion.span>
                </NavLink>
              )}
              <motion.button
                onClick={handleLogout}
                className="block sm:inline-block bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 w-full sm:w-auto mt-2 sm:mt-0"
                variants={linkVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}
                whileTap="tap"
                aria-label="Logout"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block sm:inline-block text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                    isActive ? 'bg-blue-700 shadow-inner' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                  Login
                </motion.span>
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `block sm:inline-block text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                    isActive ? 'bg-blue-700 shadow-inner' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                  Signup
                </motion.span>
              </NavLink>
            </>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;