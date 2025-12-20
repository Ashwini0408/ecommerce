import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import type { Product } from '../../types';
import { useAppDispatch } from '../../hooks/useAuth';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
        quantity: 1,
        image: product.images[0] || '/placeholder.jpg',
        stock: product.stock,
      })
    );
    toast.success('Added to cart!');
  };

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="glass-card-hover rounded-2xl overflow-hidden group cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-dark-900">
          <img
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass-card rounded-xl hover:bg-white/20 transition-colors"
              >
                <FiHeart size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex items-center space-x-2 px-4 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiShoppingCart size={18} />
                <span className="text-sm font-semibold">Add to Cart</span>
              </motion.button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {discount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                -{discount}%
              </span>
            )}
            {product.stock === 0 && (
              <span className="px-3 py-1 bg-dark-800 text-dark-300 text-xs font-bold rounded-lg">
                Out of Stock
              </span>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg">
                Low Stock
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Category */}
          <div className="text-xs text-primary-400 font-semibold uppercase tracking-wider">
            {product.category}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:text-primary-400 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-dark-400 line-clamp-2">{product.description}</p>

          {/* Price */}
          <div className="flex items-center space-x-2 pt-2">
            {product.salePrice ? (
              <>
                <span className="text-xl font-bold gradient-text">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-dark-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold gradient-text">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Attributes */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {product.attributes.slice(0, 3).map((attr, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-dark-800 text-dark-300 text-xs rounded-lg"
                >
                  {attr.value}
                </span>
              ))}
              {product.attributes.length > 3 && (
                <span className="px-2 py-1 bg-dark-800 text-dark-300 text-xs rounded-lg">
                  +{product.attributes.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;