import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMapPin } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import { useAppSelector, useAppDispatch } from '../../hooks/useAuth';
import { useAuth } from '../../hooks/useAuth';
import { clearCart } from '../../store/slices/cartSlice';
import { orderApi } from '../../api/orderApi';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth();
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
    phone: user?.phone || '',
  });

  const shippingCost = totalPrice > 50 ? 0 : 10;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode) {
      toast.error('Please fill in all required address fields');
      return false;
    }
    if (!formData.phone) {
      toast.error('Please provide a phone number');
      return false;
    }
    return true;
  };

  const handleRazorpayPayment = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Create order in backend
      const shippingAddress = `${formData.addressLine1}, ${formData.addressLine2 ? formData.addressLine2 + ', ' : ''}${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`;

      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),
        shippingAddress,
      };

      const order = await orderApi.createOrder(orderData);

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxx',
        amount: Math.round(finalTotal * 100), // Convert to paise
        currency: 'USD',
        name: 'STYLISTE',
        description: `Order #${order.id}`,
        order_id: '', // You would get this from your backend Razorpay order creation
        handler: async function (response: any) {
          // Payment successful
          toast.success('Payment successful! Order placed.');
          dispatch(clearCart());
          navigate(`/dashboard?orderSuccess=${order.id}`);
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: formData.phone,
        },
        theme: {
          color: '#0ea5e9',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.error('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast.error(error.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    // For demo purposes, simulate successful order without Razorpay
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      const shippingAddress = `${formData.addressLine1}, ${formData.addressLine2 ? formData.addressLine2 + ', ' : ''}${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`;

      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),
        shippingAddress,
      };

      const order = await orderApi.createOrder(orderData);
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      navigate(`/dashboard?orderSuccess=${order.id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FiMapPin className="text-primary-400" size={24} />
                <h2 className="text-xl font-bold text-white">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-dark-300 mb-2 block">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    className="input-field"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-dark-300 mb-2 block">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, etc. (optional)"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-dark-300 mb-2 block">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-dark-300 mb-2 block">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-dark-300 mb-2 block">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-dark-300 mb-2 block">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FiLock className="text-primary-400" size={24} />
                <h2 className="text-xl font-bold text-white">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 glass-card rounded-xl">
                  <input
                    type="radio"
                    id="razorpay"
                    name="payment"
                    defaultChecked
                    className="accent-primary-500"
                  />
                  <label htmlFor="razorpay" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-white">Razorpay</div>
                    <div className="text-sm text-dark-400">
                      Pay securely with Razorpay (Cards, UPI, Wallets)
                    </div>
                  </label>
                  <img
                    src="https://razorpay.com/assets/razorpay-glyph.svg"
                    alt="Razorpay"
                    className="h-8"
                  />
                </div>

                <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl">
                  <p className="text-sm text-primary-300">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto custom-scrollbar">
                {items.map((item) => {
                  const effectivePrice = item.salePrice || item.price;
                  return (
                    <div key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white line-clamp-1">
                          {item.name}
                        </div>
                        <div className="text-xs text-dark-400">Qty: {item.quantity}</div>
                        <div className="text-sm font-bold gradient-text">
                          ${(effectivePrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 border-t border-white/10 pt-4">
                <div className="flex justify-between text-dark-300">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-dark-300">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-dark-300">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span className="gradient-text">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Place Order - $${finalTotal.toFixed(2)}`}
              </motion.button>

              <p className="text-xs text-dark-500 text-center mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
};

export default CheckoutPage;