// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiShoppingCart, FiHeart, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
// import Navbar from '../../components/layout/Navbar';
// import { Footer } from '../../components/layout/Footer';
// import { productApi } from '../../api/productApi';
// import type { Product } from '../../types';
// import { useAppDispatch } from '../../hooks/useAuth';
// import { addToCart } from '../../store/slices/cartSlice';
// import toast from 'react-hot-toast';

// // ----------------------------------------------------------------------
// // 1. HELPER: Fix Image URLs
// // ----------------------------------------------------------------------
// const SERVER_URL = import.meta.env.VITE_API_IMG_URL ;
//   const getImageUrl = (path?: string) => {
//     if (!path) return '/placeholder.jpg';
//     if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('https://')) return path; // Already absolute or local blob
//     return `${SERVER_URL}${path.startsWith('/') ? '' : '/'}${path}`;
//   };


// const ProductDetailPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     if (id) {
//       fetchProduct();
//     }
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const data = await productApi.getProductById(Number(id));
//       setProduct(data);

//       // Auto-select first available options
//       const sizes = data.attributes.filter((a) => a.type === 'Size');
//       const colors = data.attributes.filter((a) => a.type === 'Color');
//       if (sizes.length > 0) setSelectedSize(sizes[0].value);
//       if (colors.length > 0) setSelectedColor(colors[0].value);
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to fetch product');
//       navigate('/products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddToCart = () => {
//     if (!product) return;

//     if (product.stock === 0) {
//       toast.error('Product is out of stock');
//       return;
//     }

//     dispatch(
//       addToCart({
//         productId: product.id,
//         name: product.name,
//         price: product.price,
//         salePrice: product.salePrice,
//         quantity,
//         selectedSize,
//         selectedColor,
//         image: product.images[0],
//         stock: product.stock,
//       })
//     );
//     toast.success('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     handleAddToCart();
//     navigate('/cart');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background text-foreground">
//         <Navbar />
//         <div className="pt-24 px-4 sm:px-6 lg:px-8  mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="glass-card rounded-2xl h-96 shimmer" />
//             <div className="space-y-4">
//               <div className="glass-card rounded-2xl h-8 w-3/4 shimmer" />
//               <div className="glass-card rounded-2xl h-6 w-1/2 shimmer" />
//               <div className="glass-card rounded-2xl h-32 shimmer" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!product) return null;

//   const discount = product.salePrice
//     ? Math.round(((product.price - product.salePrice) / product.price) * 100)
//     : 0;

//   const sizes = product.attributes.filter((a) => a.type === 'Size');
//   const colors = product.attributes.filter((a) => a.type === 'Color');

//   return (
//     <div className="min-h-screen bg-background text-foreground">

//       <Navbar />

//       <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 mx-auto">
//         {/* Back Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate('/products')}
//           className="flex items-center space-x-2 text-muted-foreground hover:text-sage transition-colors"
//         >
//           <FiArrowLeft />
//           <span>Back to Products</span>
//         </motion.button>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* Images */}
//           <div className="space-y-4">
//             {/* Main Image */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="aspect-square rounded-2xl overflow-hidden glass-card"
//             >
//               <img
//                 src={getImageUrl(product.images[selectedImage])}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </motion.div>

//             {/* Thumbnails */}
//             {product.images.length > 1 && (
//               <div className="grid grid-cols-4 gap-4">
//                 {product.images.map((image, index) => (
//                   <motion.button
//                     key={index}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setSelectedImage(index)}
//                     className={`aspect-square rounded-xl overflow-hidden ${
//                       selectedImage === index
//                         ? 'ring-2 ring-primary-500'
//                         : 'glass-card'
//                     }`}
//                   >
//                     <img 
//                         // ✅ Fix: Use helper here
//                         src={getImageUrl(image)} 
//                         alt={`${product.name} ${index + 1}`} 
//                         className="w-full h-full object-cover" 
//                     />
//                   </motion.button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             {/* Category & Stock */}
//             <div className="flex items-center justify-between">
//              <span className="text-sm font-semibold text-sage uppercase tracking-wider">
//                 {product.category}
//               </span>
//               <span
//                 className={`px-3 py-1 rounded-lg text-xs font-semibold ${
//                   product.stock > 0
//                     ? 'bg-green-500/20 text-green-400'
//                     : 'bg-red-500/20 text-red-400'
//                 }`}
//               >
//                 {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
//               </span>
//             </div>

//             {/* Title */}
//             <h1 className="text-4xl font-display font-bold text-foreground">{product.name}</h1>

//             {/* Price */}
//             <div className="flex items-center space-x-4">
//               {product.salePrice ? (
//                 <>
//                   <span className="text-4xl font-bold gradient-text">
//                     ${product.salePrice.toFixed(2)}
//                   </span>
//                   <span className="text-2xl text-muted-foreground line-through">
//                     ${product.price.toFixed(2)}
//                   </span>
//                   <span className="px-3 py-1 bg-red-500 text-foreground text-sm font-bold rounded-lg">
//                     Save {discount}%
//                   </span>
//                 </>
//               ) : (
//                 <span className="text-4xl font-bold gradient-text">
//                   ${product.price.toFixed(2)}
//                 </span>
//               )}
//             </div>

//             {/* Description */}
//            <p className="text-muted-foreground leading-relaxed">
// {product.description}</p>

//             {/* Size Selection */}
//             {sizes.length > 0 && (
//               <div>
//                 <label className="text-sm font-semibold text-muted-foreground mb-3 block">
//                   Size: {selectedSize}
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {sizes.map((size) => (
//                     <motion.button
//                       key={size.value}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setSelectedSize(size.value)}
//                       className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
//                         selectedSize === size.value
//                           ? 'bg-primary-500 text-foreground'
//                           : 'glass-card hover:bg-accent/20'
//                       }`}
//                     >
//                       {size.value}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Color Selection */}
//             {colors.length > 0 && (
//               <div>
//                 <label className="text-sm font-semibold text-sage mb-3 block">
//                   Color: {selectedColor}
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {colors.map((color) => (
//                     <motion.button
//                       key={color.value}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setSelectedColor(color.value)}
//                       className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
//                         selectedColor === color.value
//                           ? 'bg-primary-500 text-foreground'
//                           : 'glass-card hover:bg-accent/20'
//                       }`}
//                     >
//                       {color.value}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantity */}
//             <div>
//               <label className="text-sm font-semibold text-sage">
//                 Quantity
//               </label>
//               <div className="flex items-center space-x-3">
//                 <motion.button
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="w-10 h-10 flex items-center justify-center glass-card rounded-xl font-bold text-lg text-foreground hover:bg-accent/20 text-foreground hover:bg-accent/20 text-foreground hover:bg-accent/20"
//                 >
//                   -
//                 </motion.button>
//                 <span className="w-16 text-center text-xl font-bold text-foreground">{quantity}</span>
//                 <motion.button
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
//                   className="w-10 h-10 flex items-center justify-center glass-card rounded-xl font-bold text-lg text-foreground hover:bg-accent/20 text-foreground hover:bg-accent/20 text-foreground hover:bg-accent/20"
//                 >
//                   +
//                 </motion.button>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleAddToCart}
//                 disabled={product.stock === 0}
//                 className="flex-1 btn-ghost flex items-center justify-center space-x-2 disabled:opacity-50"
//               >
//                 <FiShoppingCart />
//                 <span>Add to Cart</span>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleBuyNow}
//                 disabled={product.stock === 0}
//                 className="flex-1 btn-primary disabled:opacity-50"
//               >
//                 Buy Now
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-4 glass-card rounded-xl hover:bg-white/10"
//               >
//                 <FiHeart size={24} />
//               </motion.button>
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
//               <div className="flex items-center space-x-3">
//                 <FiTruck className="text-primary-400" size={24} />
//                 <div>
//                   <div className="font-semibold text-foreground">Free Shipping</div>
//                   <div className="text-xs text-muted-foreground">On orders over $50</div>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <FiShield className="text-primary-400" size={24} />
//                 <div>
//                   <div className="font-semibold text-foreground">Secure Payment</div>
//                   <div className="text-xs text-muted-foreground">100% Protected</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductDetailPage;


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiTruck, FiShield, FiArrowLeft, FiStar } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';
import Navbar from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { productApi } from '../../api/productApi';
import type { Product } from '../../types';
import { useAppDispatch } from '../../hooks/useAuth';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { wishlistApi } from "../../api/wishlistApi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { formatINR } from "../../utils/currency";

// ----------------------------------------------------------------------
// 1. HELPER: Fix Image URLs
// ----------------------------------------------------------------------
const SERVER_URL = import.meta.env.VITE_API_IMG_URL;
const getImageUrl = (path?: string) => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('https://')) return path;
  return `${SERVER_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

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
  // const [isWishlisted, setIsWishlisted] = useState(false);
  const { toggleWishlist, wishlistIds } = useWishlist();


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
        image: product.images[0],
        stock: product.stock,
      })
    );
    toast.success('Added to cart!');
  };
const handleWishlistToggle = async () => {
  if (!localStorage.getItem("authToken")) {
    navigate("/login");
    return;
  }

  try {
    await toggleWishlist(product!.id);
  } catch {
    toast.error("Failed to update wishlist");
  }
};


  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  // Clear selection function
  const handleClearSelection = () => {
    const sizes = product?.attributes.filter((a) => a.type === 'Size') || [];
    const colors = product?.attributes.filter((a) => a.type === 'Color') || [];
    if (sizes.length > 0) setSelectedSize(sizes[0].value);
    if (colors.length > 0) setSelectedColor(colors[0].value);
    setQuantity(1);
    toast.success('Selection cleared!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className=" sm:px-6 lg:px-8 mx-auto">
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
const isWishlisted = wishlistIds.includes(product.id);

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const sizes = product.attributes.filter((a) => a.type === 'Size');
  const colors = product.attributes.filter((a) => a.type === 'Color');

  // Mock review data from the image
  const reviewData = {
    rating: 4.8,
    reviewCount: 245,
    stars: 5
  };

  return (
    <div className="pl-8 pr-8 min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-5 pb-3 px-4 sm:px-6 lg:px-8 mx-auto max-w-8xl">
        {/* Back Button - Smaller */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-sage transition-colors mb-4"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </motion.button>

        {/* Breadcrumb - Smaller */}
        <div className="mb-4 text-xs text-muted-foreground">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-sage cursor-pointer"
          >
            Home
          </button>
          <span className="mx-1">/</span>
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-sage cursor-pointer"
          >
            Products
          </button>
          <span className="mx-1">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Left Column - Images */}
<div className="flex gap-12">

  {/* THUMBNAILS (LEFT SIDE) */}
  {product.images.length > 1 && (
    <div className="flex flex-col gap-2">
      {product.images.map((image, index) => (
        <button
          key={index}
          onClick={() => setSelectedImage(index)}
          className={`w-12 h-12  overflow-hidden border
            ${
              selectedImage === index
                ? "border-sage ring-2 ring-sage/40"
                : "border-gray-300"
            }`}
        >
          <img
            src={getImageUrl(image)}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  )}

  {/* MAIN IMAGE */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex-shrink-0"
  >
    <div className="w-[450px] aspect-[6/7] rounded-xl overflow-hidden ">
      <img
        src={getImageUrl(product.images[selectedImage])}
        alt={product.name}
        className="w-full h-full object-contain"
      />
    </div>
  </motion.div>

</div>


          {/* Right Column - Product Info - Smaller */}
          <div className="space-y-4">
            {/* Category */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-sage uppercase tracking-wider">
                {product.category}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  product.stock > 0
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {product.stock > 0 ? `In Stock` : 'Out of stock'}
              </span>
            </div>

            {/* Title - Smaller */}
            <h1 className="text-2xl font-display font-bold text-foreground">
              {product.name}
            </h1>

            {/* Rating - Smaller */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(reviewData.stars)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(reviewData.rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">
                {reviewData.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({reviewData.reviewCount} Reviews)
              </span>
            </div>

            {/* Price - Smaller */}
            <div className="flex items-center space-x-3">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold text-foreground">
                     {formatINR(product.salePrice)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                     {formatINR(product.price)}
                  </span>
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded">
                    -{discount}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-foreground">
                  {formatINR(product.price)}
                </span>
              )}
            </div>

            {/* Description - Smaller */}
            <p className="text-sm text-muted-foreground leading-relaxed border-b border-border pb-4">
              {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>

            {/* Color Selection - Smaller */}
            {colors.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Color: <span className="text-foreground font-bold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <motion.button
                      key={color.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color.value
                          ? 'border-sage ring-1 ring-sage/30 bg-sage/10'
                          : 'border-border'
                      }`}
                      style={{
                        backgroundColor: color.value.toLowerCase() === 'brown' ? '#8B4513' :
                                        color.value.toLowerCase() === 'black' ? '#000000' :
                                        color.value.toLowerCase() === 'blue' ? '#0000FF' :
                                        color.value.toLowerCase() === 'white' ? '#FFFFFF' : '#F3F4F6',
                      }}
                      title={color.value}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection - Smaller */}
            {sizes.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Size: <span className="text-foreground font-bold">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size.value)}
                      className={`px-3 py-1.5 text-sm rounded font-medium transition-all ${
                        selectedSize === size.value
                          ? 'bg-sage text-white'
                          : 'glass-card hover:bg-accent/20 text-foreground'
                      }`}
                    >
                      {size.value}
                    </motion.button>
                  ))}
                  <button className="text-xs text-sage hover:underline font-medium">
                    View Size Guide
                  </button>
                </div>
              </div>
            )}

            {/* SKU and Clear */}
            {/* <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>SKU: <span className="font-semibold text-foreground">GHT95245AAA</span></span>
              <button 
                onClick={handleClearSelection}
                className="text-red-400 hover:text-red-500 font-medium"
              >
                Clear
              </button>
            </div> */}

            {/* Quantity and Actions - Smaller */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-sage mb-1 block">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center glass-card rounded-lg font-bold text-base hover:bg-accent/20"
                    >
                      -
                    </motion.button>
                    <span className="w-10 text-center text-lg font-bold text-foreground">{quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center glass-card rounded-lg font-bold text-base hover:bg-accent/20"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Smaller */}
             <div className="flex gap-3 mt-2">
  {/* ADD TO CART */}
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={handleAddToCart}
    disabled={product.stock === 0}
    className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-sage text-white font-medium hover:opacity-90 disabled:opacity-50"
  >
    <FiShoppingCart className="w-4 h-4" />
    Add to Cart
  </motion.button>

  {/* WISHLIST */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handleWishlistToggle}
    className="w-12 h-12 flex items-center justify-center rounded-lg bg-sage text-white hover:opacity-90"
  >
    {isWishlisted ? (
      <FaHeart className="w-4 h-4" />
    ) : (
      <FaRegHeart className="w-4 h-4" />
    )}
  </motion.button>

  {/* BUY NOW */}
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={handleBuyNow}
    disabled={product.stock === 0}
    className="flex-1 h-12 rounded-lg bg-sage text-white font-medium hover:opacity-90 disabled:opacity-50"
  >
    Buy Now
  </motion.button>
</div>
            </div>

            {/* Features - Smaller */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <FiTruck className="text-sage w-5 h-5" />
                <div>
                  <div className="text-sm font-semibold text-foreground">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FiShield className="text-sage w-5 h-5" />
                <div>
                  <div className="text-sm font-semibold text-foreground">Secure Payment</div>
                  <div className="text-xs text-muted-foreground">100% Protected</div>
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