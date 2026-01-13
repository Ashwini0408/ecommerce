// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiSearch } from 'react-icons/fi';
// // import { useAuth } from '../hooks/useAuth';
// import useAuth from '../../hooks/useAuth';
// import { useAppSelector } from '../../hooks/useAuth';
// import { logout } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';
// import logo from '../../assets/logo.png';
// const Navbar = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, user, isAdmin, dispatch } = useAuth();
//   const { totalItems } = useAppSelector((state) => state.cart);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     toast.success('Logged out successfully');
//     navigate('/');
//     setIsUserMenuOpen(false);
//   };

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled ? 'glass-card shadow-xl' : 'bg-transparent'
//       }`}
//     >
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
// <Link to="/" className="flex items-center">
//   <motion.img
//     src={logo}
//     alt="Styliste Logo"
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     className="h-12 w-auto object-contain"
//   />
// </Link>


//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-dark-200 hover:text-white transition-colors">
//               Home
//             </Link>
//             <Link to="/products" className="text-dark-200 hover:text-white transition-colors">
//               Products
//             </Link>
//             <Link to="/about" className="text-dark-200 hover:text-white transition-colors">
//               About us
//             </Link>
//             <Link to="/services" className="text-dark-200 hover:text-white transition-colors">
//               Services
//             </Link>
//             <Link to="/contact" className="text-dark-200 hover:text-white transition-colors">
//               Contact us
//             </Link>
//             {isAuthenticated && !isAdmin && (
//               <Link to="/dashboard" className="text-dark-200 hover:text-white transition-colors">
//                 Dashboard
//               </Link>
//             )}
//             {isAdmin && (
//               <Link to="/admin" className="text-dark-200 hover:text-white transition-colors">
//                 Admin
//               </Link>
//             )}
//           </div>

//           {/* Right Side Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             {/* Search Icon */}
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => navigate('/products')}
//               className="p-2 text-dark-200 hover:text-white transition-colors"
//             >
//               <FiSearch size={22} />
//             </motion.button>

//             {/* Cart */}
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => navigate('/cart')}
//               className="relative p-2 text-dark-200 hover:text-white transition-colors"
//             >
//               <FiShoppingCart size={22} />
//               {totalItems > 0 && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
//                 >
//                   {totalItems}
//                 </motion.span>
//               )}
//             </motion.button>

//             {/* User Menu */}
//             {isAuthenticated ? (
//               <div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                   className="flex items-center space-x-2 p-2 rounded-xl glass-card-hover"
//                 >
//                   <FiUser size={20} />
//                   <span className="text-sm font-medium">{user?.name}</span>
//                 </motion.button>

//                 <AnimatePresence>
//                   {isUserMenuOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-xl overflow-hidden"
//                     >
//                       <Link
//                         to={isAdmin ? '/admin' : '/dashboard'}
//                         onClick={() => setIsUserMenuOpen(false)}
//                         className="block px-4 py-3 hover:bg-white/5 transition-colors"
//                       >
//                         Dashboard
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-center space-x-2 text-red-400"
//                       >
//                         <FiLogOut size={18} />
//                         <span>Logout</span>
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <Link to="/login">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="btn-ghost px-4 py-2"
//                   >
//                     Login
//                   </motion.button>
//                 </Link>
//                 <Link to="/signup">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="btn-primary px-4 py-2"
//                   >
//                     Sign Up
//                   </motion.button>
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 text-dark-200 hover:text-white"
//           >
//             {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </motion.button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden glass-card border-t border-white/10"
//           >
//             <div className="px-4 py-4 space-y-3">
//               <Link
//                 to="/"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block py-2 text-dark-200 hover:text-white transition-colors"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/products"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block py-2 text-dark-200 hover:text-white transition-colors"
//               >
//                 Products
//               </Link>
//               <Link
//                 to="/about"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block py-2 text-dark-200 hover:text-white transition-colors"
//               >
//                 About us
//               </Link>
//               <Link
//                 to="/contact"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block py-2 text-dark-200 hover:text-white transition-colors"
//               >
//                 Contact us
//               </Link>
//               <Link
//                 to="/cart"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block py-2 text-dark-200 hover:text-white transition-colors flex items-center justify-between"
//               >
//                 <span>Cart</span>
//                 {totalItems > 0 && (
//                   <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>
//               {isAuthenticated ? (
//                 <>
//                   <Link
//                     to={isAdmin ? '/admin' : '/dashboard'}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block py-2 text-dark-200 hover:text-white transition-colors"
//                   >
//                     Dashboard
//                   </Link>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <div className="space-y-2 pt-2">
//                   <Link to="/login" onClick={() => setIsMenuOpen(false)}>
//                     <button className="w-full btn-ghost py-2">Login</button>
//                   </Link>
//                   <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
//                     <button className="w-full btn-primary py-2">Sign Up</button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;




// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiShoppingCart,
//   FiUser,
//   FiMenu,
//   FiX,
//   FiLogOut,
//   FiSearch,
// } from "react-icons/fi";
// import useAuth from "../../hooks/useAuth";
// import { useAppSelector } from "../../hooks/useAuth";
// import { logout } from "../../store/slices/authSlice";
// import toast from "react-hot-toast";
// import logo from "../../assets/logo.png";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, user, isAdmin, dispatch } = useAuth();
//   const { totalItems } = useAppSelector((state) => state.cart);

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     toast.success("Logged out successfully");
//     navigate("/");
//     setIsUserMenuOpen(false);
//   };

//   return (
//     <motion.nav
//       initial={{ y: -80 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isScrolled
//           ? "bg-gradient-to-r from-[#7F8F72] via-[#8FA17A] to-[#7F8F72] shadow-xl backdrop-blur"
//           : "bg-gradient-to-r from-[#9CAF88] via-[#A8B79A] to-[#9CAF88]"
//       }`}
//     >
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* ---------------- LOGO ---------------- */}
//           <Link to="/" className="flex items-center">
//             <motion.img
//               src={logo}
//               alt="Styliste Logo"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="h-12 w-auto object-contain"
//             />
//           </Link>

//           {/* ---------------- DESKTOP NAV ---------------- */}
//           <div className="hidden md:flex items-center space-x-8">
//             {[
//               { name: "Home", path: "/" },
//               { name: "Products", path: "/products" },
//               { name: "About us", path: "/about" },
//               { name: "Services", path: "/services" },
//               { name: "Contact us", path: "/contact" },
//               { name: "Blog", path: "/blog" },
//               { name: "Testimonials", path: "/testimonials" },
//             ].map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className="relative text-white/80 hover:text-white transition-all duration-300
//                   after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white
//                   after:w-0 hover:after:w-full after:transition-all after:duration-300"
//               >
//                 {item.name}
//               </Link>
//             ))}

//             {isAuthenticated && !isAdmin && (
//               <Link
//                 to="/dashboard"
//                 className="text-white/80 hover:text-white transition-colors"
//               >
//                 Dashboard
//               </Link>
//             )}

//             {isAdmin && (
//               <Link
//                 to="/admin"
//                 className="text-white/80 hover:text-white transition-colors"
//               >
//                 Admin
//               </Link>
//             )}
//           </div>

//           {/* ---------------- RIGHT ACTIONS ---------------- */}
//           <div className="hidden md:flex items-center space-x-4">
//             {/* Search */}
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => navigate("/products")}
//               className="p-2 text-white/80 hover:text-white"
//             >
//               <FiSearch size={22} />
//             </motion.button>

//             {/* Cart */}
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => navigate("/cart")}
//               className="relative p-2 text-white/80 hover:text-white"
//             >
//               <FiShoppingCart size={22} />
//               {totalItems > 0 && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-1 -right-1 bg-white text-[#7F8F72] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
//                 >
//                   {totalItems}
//                 </motion.span>
//               )}
//             </motion.button>

//             {/* User Menu */}
//             {isAuthenticated ? (
//               <div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 text-white"
//                 >
//                   <FiUser size={18} />
//                   <span className="text-sm font-medium">{user?.name}</span>
//                 </motion.button>

//                 <AnimatePresence>
//                   {isUserMenuOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       className="absolute right-0 mt-2 w-48 bg-[#7F8F72] rounded-xl shadow-xl overflow-hidden"
//                     >
//                       <Link
//                         to={isAdmin ? "/admin" : "/dashboard"}
//                         onClick={() => setIsUserMenuOpen(false)}
//                         className="block px-4 py-3 text-white/90 hover:bg-white/10"
//                       >
//                         Dashboard
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-3 flex items-center gap-2 text-red-300 hover:bg-white/10"
//                       >
//                         <FiLogOut />
//                         Logout
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <Link to="/login">
//                   <button className="px-4 py-2 rounded-lg text-white hover:bg-white/10">
//                     Login
//                   </button>
//                 </Link>
//                 <Link to="/signup">
//                   <button className="px-4 py-2 rounded-lg bg-white text-[#7F8F72] font-semibold">
//                     Sign Up
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* ---------------- MOBILE MENU BUTTON ---------------- */}
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 text-white"
//           >
//             {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </motion.button>
//         </div>
//       </div>

//       {/* ---------------- MOBILE MENU ---------------- */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-gradient-to-b from-[#9CAF88] to-[#7F8F72]"
//           >
//             <div className="px-4 py-4 space-y-3">
//               {[
//                 { name: "Home", path: "/" },
//                 { name: "Products", path: "/products" },
//                 { name: "About us", path: "/about" },
//                 { name: "Contact us", path: "/contact" },
//               ].map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block py-2 text-white/80 hover:text-white"
//                 >
//                   {item.name}
//                 </Link>
//               ))}

//               <Link
//                 to="/cart"
//                 onClick={() => setIsMenuOpen(false)}
//                 className="flex justify-between items-center py-2 text-white"
//               >
//                 Cart
//                 {totalItems > 0 && (
//                   <span className="bg-white text-[#7F8F72] text-xs rounded-full px-2 py-1">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>

//               {isAuthenticated ? (
//                 <>
//                   <Link
//                     to={isAdmin ? "/admin" : "/dashboard"}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block py-2 text-white/80 hover:text-white"
//                   >
//                     Dashboard
//                   </Link>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full text-left py-2 text-red-300"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <div className="space-y-2 pt-2">
//                   <Link to="/login" onClick={() => setIsMenuOpen(false)}>
//                     <button className="w-full py-2 rounded-lg bg-white/10 text-white">
//                       Login
//                     </button>
//                   </Link>
//                   <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
//                     <button className="w-full py-2 rounded-lg bg-white text-[#7F8F72] font-semibold">
//                       Sign Up
//                     </button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;


import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiSearch,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useAppSelector } from "../../hooks/useAuth";
import { logout } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin, dispatch } = useAuth();
  const { totalItems } = useAppSelector((state) => state.cart);
const location = useLocation();
const isActive = (path: string) => location.pathname === path;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
    setIsUserMenuOpen(false);
  };

  return (
    <>
      {/* ---------------- NAVBAR ---------------- */}
<nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "bg-gradient-to-r from-[#5E6E54] via-[#6B7D60] to-[#5E6E54] shadow-xl backdrop-blur"
      : "bg-gradient-to-r from-[#6B7D60] via-[#7A8D6D] to-[#6B7D60]"
  }`}
>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* ---------------- LOGO ---------------- */}
            <Link to="/" className="flex items-center">
              <motion.img
                src={logo}
                alt="Styliste Logo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* ---------------- DESKTOP NAV ---------------- */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", path: "/" },
                // { name: "Products", path: "/products" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact us", path: "/contact" },
                // { name: "Blog", path: "/blog" },
                { name: "Testimonials", path: "/testimonials" },
              ].map((item) => (
                <Link
  key={item.name}
  to={item.path}
  className={`relative transition-all duration-300
    ${
      isActive(item.path)
        ? "text-white font-medium after:w-full"
        : "text-white/80 hover:text-white after:w-0"
    }
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white
    after:transition-all after:duration-300`}
>
                  {item.name}
                </Link>
              ))}

              {isAuthenticated && !isAdmin && (
                <Link
                  to="/dashboard"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* ---------------- RIGHT ACTIONS ---------------- */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/products")}
                className="p-2 text-white/80 hover:text-white"
              >
                <FiSearch size={22} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/cart")}
                className="relative p-2 text-white/80 hover:text-white"
              >
                <FiShoppingCart size={22} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-white text-[#7F8F72] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 text-white"
                  >
                    <FiUser size={18} />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-[#7F8F72] rounded-xl shadow-xl overflow-hidden"
                      >
                        <Link
                          to={isAdmin ? "/admin" : "/dashboard"}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-3 text-white/90 hover:bg-white/10"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 flex items-center gap-2 text-red-300 hover:bg-white/10"
                        >
                          <FiLogOut />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <button className="px-4 py-2 rounded-lg text-white hover:bg-white/10">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-4 py-2 rounded-lg bg-white text-[#7F8F72] font-semibold">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* ---------------- MOBILE MENU BUTTON ---------------- */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* ---------------- MOBILE MENU ---------------- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gradient-to-b from-[#9CAF88] to-[#7F8F72]"
            >
              <div className="px-4 py-4 space-y-3">
                {[
                  { name: "Home", path: "/" },
                  // { name: "Products", path: "/products" },
                  { name: "Services", path: "/services" },
                  { name: "About us", path: "/about" },
                  { name: "Contact us", path: "/contact" },
                  { name: "Testimonials", path: "/testimonials" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-white/80 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ---------------- NAVBAR SPACER (IMPORTANT FIX) ---------------- */}
      <div className="h-20" />
    </>
  );
};
export default Navbar;