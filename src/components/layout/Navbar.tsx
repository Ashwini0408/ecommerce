import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiSearch } from 'react-icons/fi';
// import { useAuth } from '../hooks/useAuth';
import useAuth from '../../hooks/useAuth';
import { useAppSelector } from '../../hooks/useAuth';
import { logout } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin, dispatch } = useAuth();
  const { totalItems } = useAppSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-display font-bold gradient-text"
            >
              STYLISTE
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark-200 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-dark-200 hover:text-white transition-colors">
              Products
            </Link>
            {isAuthenticated && !isAdmin && (
              <Link to="/dashboard" className="text-dark-200 hover:text-white transition-colors">
                Dashboard
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-dark-200 hover:text-white transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/products')}
              className="p-2 text-dark-200 hover:text-white transition-colors"
            >
              <FiSearch size={22} />
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/cart')}
              className="relative p-2 text-dark-200 hover:text-white transition-colors"
            >
              <FiShoppingCart size={22} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl glass-card-hover"
                >
                  <FiUser size={20} />
                  <span className="text-sm font-medium">{user?.name}</span>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-xl overflow-hidden"
                    >
                      <Link
                        to={isAdmin ? '/admin' : '/dashboard'}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-3 hover:bg-white/5 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center space-x-2 text-red-400"
                      >
                        <FiLogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-ghost px-4 py-2"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary px-4 py-2"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-dark-200 hover:text-white"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-dark-200 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-dark-200 hover:text-white transition-colors"
              >
                Products
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-dark-200 hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1">
                    {totalItems}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to={isAdmin ? '/admin' : '/dashboard'}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-dark-200 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full btn-ghost py-2">Login</button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full btn-primary py-2">Sign Up</button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;