import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { productApi } from '../../api/productApi';
import type { Product } from '../../types';
import { useAppDispatch } from '../../hooks/useAuth';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productApi.getProductById(Number(id));
      setProduct(data);

      // Auto-select first available options
      const sizes = data.attributes.filter((a) => a.type === 'Size');
      const colors = data.attributes.filter((a) => a.type === 'Color');
      if (sizes.length > 0) setSelectedSize(sizes[0].value);
      if (colors.length > 0) setSelectedColor(colors[0].value);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        quantity,
        selectedSize,
        selectedColor,
        image: product.images[0] || '/placeholder.jpg',
        stock: product.stock,
      })
    );
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl h-96 shimmer" />
            <div className="space-y-4">
              <div className="glass-card rounded-2xl h-8 w-3/4 shimmer" />
              <div className="glass-card rounded-2xl h-6 w-1/2 shimmer" />
              <div className="glass-card rounded-2xl h-32 shimmer" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const sizes = product.attributes.filter((a) => a.type === 'Size');
  const colors = product.attributes.filter((a) => a.type === 'Color');

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/products')}
          className="flex items-center space-x-2 text-dark-300 hover:text-white mb-8 transition-colors"
        >
          <FiArrowLeft />
          <span>Back to Products</span>
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-2xl overflow-hidden glass-card"
            >
              <img
                src={product.images[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden ${
                      selectedImage === index
                        ? 'ring-2 ring-primary-500'
                        : 'glass-card'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Stock */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                {product.category}
              </span>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  product.stock > 0
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-display font-bold text-white">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center space-x-4">
              {product.salePrice ? (
                <>
                  <span className="text-4xl font-bold gradient-text">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-2xl text-dark-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">
                    Save {discount}%
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold gradient-text">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-dark-300 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-dark-300 mb-3 block">
                  Size: {selectedSize}
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size.value)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                        selectedSize === size.value
                          ? 'bg-primary-500 text-white'
                          : 'glass-card hover:bg-white/10'
                      }`}
                    >
                      {size.value}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-dark-300 mb-3 block">
                  Color: {selectedColor}
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <motion.button
                      key={color.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color.value)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                        selectedColor === color.value
                          ? 'bg-primary-500 text-white'
                          : 'glass-card hover:bg-white/10'
                      }`}
                    >
                      {color.value}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-semibold text-dark-300 mb-3 block">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center glass-card rounded-xl font-bold text-lg"
                >
                  -
                </motion.button>
                <span className="w-16 text-center text-xl font-bold">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center glass-card rounded-xl font-bold text-lg"
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-ghost flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <FiShoppingCart />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                Buy Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 glass-card rounded-xl hover:bg-white/10"
              >
                <FiHeart size={24} />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <FiTruck className="text-primary-400" size={24} />
                <div>
                  <div className="font-semibold text-white">Free Shipping</div>
                  <div className="text-xs text-dark-400">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiShield className="text-primary-400" size={24} />
                <div>
                  <div className="font-semibold text-white">Secure Payment</div>
                  <div className="text-xs text-dark-400">100% Protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;