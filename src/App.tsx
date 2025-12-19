import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch } from './hooks/useAuth';
import { loadUserFromStorage } from './store/slices/authSlice';
import { loadCartFromStorage } from './store/slices/cartSlice';

// Public Pages
import HomePage from './components/pages/public/HomePage';
import LoginPage from './components/pages/auth/LoginPage';
import SignUpPage from './components/pages/auth/SignUpPage';
import ProductsPage from './components/pages/public/ProductsPage';
import ProductDetailPage from './components/pages/public/ProductDetailPage';
import CartPage from './components/pages/public/CartPage';
import CheckoutPage from './components/pages/public/CheckoutPage';

// User & Admin Pages
import UserDashboard from './components/pages/user/UserDashboard';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

const NotFound = () => <div className="p-8 text-center text-red-500">404 - Page Not Found</div>;

function App() {
  const dispatch = useAppDispatch();

  // Load user and cart from localStorage on app mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-dark-950 text-dark-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

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