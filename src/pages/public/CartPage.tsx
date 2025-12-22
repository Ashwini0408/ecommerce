import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useAppSelector, useAppDispatch } from '../../hooks/useAuth';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalPrice, totalItems } = useAppSelector((state) => state.cart);

  const handleRemoveItem = (productId: number, selectedSize?: string, selectedColor?: string) => {
    dispatch(removeFromCart({ productId, selectedSize, selectedColor }));
    toast.success('Item removed from cart');
  };

  const handleIncrement = (productId: number, selectedSize?: string, selectedColor?: string) => {
    dispatch(incrementQuantity({ productId, selectedSize, selectedColor }));
  };

  const handleDecrement = (productId: number, selectedSize?: string, selectedColor?: string) => {
    dispatch(decrementQuantity({ productId, selectedSize, selectedColor }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const shippingCost = totalPrice > 50 ? 0 : 10;
  const tax = totalPrice * 0.1; // 10% tax
  const finalTotal = totalPrice + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Navbar />
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="glass-card rounded-2xl p-12 text-center">
            <FiShoppingBag className="mx-auto text-dark-600 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-dark-400 mb-6">Start shopping to add items to your cart</p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-white">Shopping Cart</h1>
            <p className="text-dark-400 mt-2">{totalItems} items in your cart</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearCart}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Clear Cart
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const effectivePrice = item.salePrice || item.price;
              const itemTotal = effectivePrice * item.quantity;

              return (
                <motion.div
                  key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <Link to={`/products/${item.productId}`}>
                      <div className="w-32 h-32 rounded-xl overflow-hidden glass-card flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/products/${item.productId}`}>
                          <h3 className="text-lg font-semibold text-white hover:text-primary-400 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.selectedSize && (
                            <span className="px-2 py-1 bg-dark-800 text-dark-300 text-xs rounded-lg">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="px-2 py-1 bg-dark-800 text-dark-300 text-xs rounded-lg">
                              Color: {item.selectedColor}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleDecrement(item.productId, item.selectedSize, item.selectedColor)
                            }
                            disabled={item.quantity === 1}
                            className="w-8 h-8 flex items-center justify-center glass-card rounded-lg font-bold disabled:opacity-50"
                          >
                            <FiMinus size={16} />
                          </motion.button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleIncrement(item.productId, item.selectedSize, item.selectedColor)
                            }
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 flex items-center justify-center glass-card rounded-lg font-bold disabled:opacity-50"
                          >
                            <FiPlus size={16} />
                          </motion.button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-bold gradient-text">
                            ${itemTotal.toFixed(2)}
                          </div>
                          {item.salePrice && (
                            <div className="text-xs text-dark-500 line-through">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        handleRemoveItem(item.productId, item.selectedSize, item.selectedColor)
                      }
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <FiTrash2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-dark-300">
                  <span>Subtotal ({totalItems} items)</span>
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
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span className="gradient-text">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {totalPrice < 50 && (
                <div className="mb-6 p-3 bg-primary-500/10 border border-primary-500/20 rounded-xl">
                  <p className="text-sm text-primary-300">
                    Add ${(50 - totalPrice).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary mb-3"
              >
                Proceed to Checkout
              </motion.button>

              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-ghost"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;