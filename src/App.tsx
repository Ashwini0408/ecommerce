// import { useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAppDispatch } from './hooks/useAuth';
// import { loadUserFromStorage } from './store/slices/authSlice';
// import { loadCartFromStorage } from './store/slices/cartSlice';

// // Public Pages
// import HomePage from './pages/public/HomePage';
// import LoginPage from './pages/auth/LoginPage';
// import SignUpPage from './pages/auth/SignUpPage';
// import ProductsPage from './pages/public/ProductsPage';
// import ProductDetailPage from './pages/public/ProductDetailPage';
// import CartPage from './pages/public/CartPage';
// import CheckoutPage from './pages/public/CheckoutPage';
// import About from './pages/public/About';
// import Contact from './pages/public/ContactUs';
// import Appointment from './pages/public/Appointment';

// // User & Admin Pages
// import UserDashboard from './pages/user/UserDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import ProtectedRoute from './components/common/ProtectedRoute';


// const NotFound = () => <div className="p-8 text-center text-red-500">404 - Page Not Found</div>;

// function App() {
//   const dispatch = useAppDispatch();

//   // Load user and cart from localStorage on app mount
//   useEffect(() => {
//     dispatch(loadUserFromStorage());
//     dispatch(loadCartFromStorage());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-dark-950 text-dark-50">
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/home" element={<Navigate to="/" replace />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/products" element={<ProductsPage />} />
//         <Route path="/products/:id" element={<ProductDetailPage />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/checkout" element={<CheckoutPage />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/appointment" element={<Appointment />} />

//         {/* Protected User Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Protected Admin Routes */}
//         <Route
//           path="/admin/*"
//           element={
//             <ProtectedRoute requireAdmin>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Fallback */}
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<Navigate to="/404" replace />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from './hooks/useAuth';
import { loadUserFromStorage } from './store/slices/authSlice';
import { loadCartFromStorage } from './store/slices/cartSlice';

// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ProductsPage from './pages/public/ProductsPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import CartPage from './pages/public/CartPage';
import CheckoutPage from './pages/public/CheckoutPage';
import About from './pages/public/About';
import Contact from './pages/public/ContactUs';
import Appointment from './pages/public/AppointmentBooking';
import SizeGuide from './pages/public/SizeGuide';

// User & Admin Pages
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';


const NotFound = () => (
  <div className="p-8 text-center text-red-500">
    404 - Page Not Found
  </div>
);

// 👉 Scroll To Top on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const dispatch = useAppDispatch();

  // Load user and cart from localStorage on app mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-dark-950 text-dark-50">

      {/* Scroll To Top Component */}
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/sizeGuide" element={<SizeGuide />} />

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
