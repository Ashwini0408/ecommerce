// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
// import Navbar from '../../components/layout/Navbar';
// import ProductCard from '../../components/product/ProductCard';
// import { productApi } from '../../api/productApi';
// import { categoryApi, type Category } from '../../api/categoryApi'; // 👈 Import Category API
// import type { Product, ProductFilterRequest } from '../../types';
// import toast from 'react-hot-toast';
// import { Footer } from '../../components/layout/Footer';
// import { formatINR } from '../../utils/currency';

// const ProductsPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // --- DYNAMIC CATEGORY STATE ---
//   const [categories, setCategories] = useState<Category[]>([]); // 👈 Store DB Data

//   // Filter States
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedSubcategory, setSelectedSubcategory] = useState('');
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // --- 1. FETCH CATEGORIES ON MOUNT ---
//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const data = await categoryApi.getAllCategories();
//         setCategories(data);
//       } catch (error) {
//         console.error("Failed to load categories");
//       }
//     };
//     loadCategories();
//   }, []);

//   // --- 2. CALCULATE SUBCATEGORIES DYNAMICALLY ---
//   // If a category is selected, show ONLY its subcategories.
//   // If NO category is selected, show ALL unique subcategories (flattened list).
//   const availableSubcategories = selectedCategory
//     ? (categories.find(c => c.name === selectedCategory)?.subCategories || []).map(s => s.name)
//     : Array.from(new Set(categories.flatMap(c => c.subCategories.map(s => s.name)))).sort();

//   // --- FETCH PRODUCTS WHEN FILTERS CHANGE ---
//   useEffect(() => {
//     fetchProducts();
//   }, [searchQuery, selectedCategory, selectedSubcategory, priceRange, sortBy, sortOrder, currentPage]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const filters: ProductFilterRequest = {
//         searchQuery: searchQuery || undefined,
//         category: selectedCategory || undefined,
//         subcategory: selectedSubcategory || undefined,
//         minPrice: priceRange.min || undefined,
//         maxPrice: priceRange.max || undefined,
//         sortBy: sortBy as any,
//         sortOrder,
//         page: currentPage,
//         pageSize: 12,
//       };

//       const response = await productApi.searchProducts(filters);
//       setProducts(response.content);
//       setTotalPages(response.totalPages);
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearFilters = () => {
//     setSearchQuery('');
//     setSelectedCategory('');
//     setSelectedSubcategory('');
//     setPriceRange({ min: 0, max: 10000 });
//     setSortBy('createdAt');
//     setSortOrder('DESC');
//     setCurrentPage(0);
//   };

//   return (
//     <div className="min-h-screen text-foreground ">
//       <Navbar />

//       <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//           <div>
//            <h1 className="text-4xl font-display font-bold text-sage">
// Explore Products
// </h1>
// <p className="text-muted-foreground mt-2">
// Discover your next favorite style
// </p>
//           </div>

//           {/* Mobile Filter Toggle */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//             className="md:hidden btn-primary flex items-center space-x-2"
//           >
//             <FiFilter />
//             <span>Filters</span>
//           </motion.button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Filters Sidebar */}
//           <AnimatePresence>
//             {(isFilterOpen || window.innerWidth >= 768) && (
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 className="md:col-span-1 space-y-6"
//               >
//                 <div className="glass-card rounded-2xl p-6 space-y-6">
//                   {/* Close Button (Mobile) */}
//                   <div className="flex items-center justify-between md:hidden">
//                     <h3 className="text-lg font-semibold">Filters</h3>
//                     <button onClick={() => setIsFilterOpen(false)}>
//                       <FiX size={24} />
//                     </button>
//                   </div>

//                   {/* Search */}
//                   <div>
//                     <label className="text-sm font-semibold text-sage mb-2 block">
//                       Search
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search products..."
//                         className="input-field pl-10"
//                       />
//                       <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" />
//                     </div>
//                   </div>

//                   {/* Dynamic Category Dropdown */}
//                   <div>
//                     <label className="text-sm font-semibold text-sage mb-2 block">
//                       Category
//                     </label>
//                     <select
//                       value={selectedCategory}
//                       onChange={(e) => {
//                         setSelectedCategory(e.target.value);
//                         setSelectedSubcategory(''); // Reset subcategory when category changes
//                       }}
//                       className="input-field"
//                     >
//                       <option value="">All Categories</option>
//                       {categories.map((cat) => (
//                         <option key={cat.id} value={cat.name}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Dynamic Subcategory Dropdown */}
//                   <div>
//                     <label className="text-sm font-semibold text-sage mb-2 block">
//                       Subcategory
//                     </label>
//                     <select
//                       value={selectedSubcategory}
//                       onChange={(e) => setSelectedSubcategory(e.target.value)}
//                       className="input-field"
//                     >
//                       <option value="">All Subcategories</option>
//                       {availableSubcategories.map((subName) => (
//                         <option key={subName} value={subName}>
//                           {subName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Price Range */}
//                   <div>
//                    <label className="text-sm font-semibold text-sage">
//   Price Range: {formatINR(priceRange.min)} – {formatINR(priceRange.max)}
// </label>

//                     <div className="space-y-2">
//                       <input
//                         type="range"
//                         min="0"
//                         max="10000"
//                         step="100"
//                         value={priceRange.max}
//                         onChange={(e) =>
//                           setPriceRange({ ...priceRange, max: Number(e.target.value) })
//                         }
//                         className="w-full accent-primary-500"
//                       />
//                     </div>
//                   </div>

//                   {/* Sort */}
//                   <div>
//                     <label className="text-sm font-semibold text-sage mb-2 block">
//                       Sort By
//                     </label>
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="input-field mb-2 bg-dark-900"
//                     >
//                       <option value="createdAt">Newest</option>
//                       <option value="price">Price</option>
//                       <option value="name">Name</option>
//                     </select>
//                     <select
//                       value={sortOrder}
//                       onChange={(e) => setSortOrder(e.target.value as 'ASC' | 'DESC')}
//                       className="input-field"
//                     >
//                       <option value="DESC">Descending</option>
//                       <option value="ASC">Ascending</option>
//                     </select>
//                   </div>

//                   {/* Clear Filters */}
//                   <button onClick={handleClearFilters} className="w-full btn-ghost">
//                     Clear All Filters
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Products Grid */}
//           <div className="md:col-span-3">
//             {loading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i} className="glass-card rounded-2xl h-96 shimmer" />
//                 ))}
//               </div>
//             ) : products.length === 0 ? (
//               <div className="glass-card rounded-2xl p-12 text-center">
//                 <p className="text-muted-foreground text-lg">
// No products found
// </p>
//                 <button onClick={handleClearFilters} className="btn-primary mt-4">
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {products.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex justify-center items-center space-x-2 mt-8">
//                     <button
//                       onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
//                       disabled={currentPage === 0}
//                       className="btn-ghost disabled:opacity-50"
//                     >
//                       Previous
//                     </button>
//                     <span className="text-muted-foreground">
//                       Page {currentPage + 1} of {totalPages}
//                     </span>
//                     <button
//                       onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
//                       disabled={currentPage === totalPages - 1}
//                       className="btn-ghost disabled:opacity-50"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductsPage;

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiSearch, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
// import { TbAdjustmentsHorizontal } from 'react-icons/tb';
// import Navbar from '../../components/layout/Navbar';
// import ProductCard from '../../components/product/ProductCard';
// import { productApi } from '../../api/productApi';
// import { categoryApi, type Category } from '../../api/categoryApi';
// import type { Product, ProductFilterRequest } from '../../types';
// import toast from 'react-hot-toast';
// import { Footer } from '../../components/layout/Footer';
// import { formatINR } from '../../utils/currency';
// import { wishlistApi } from "../../api/wishlistApi";
// import productFilterApi from '../../api/productFilterApi';
// import { resolveColor } from "../../utils/colorResolver";

// const ProductsPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);
//   const [expandedSections, setExpandedSections] = useState({
//     category: true,
//     subcategory: true,
//     price: true,
//     size: true,
//     color: true,
//     sort: false
//   });

//   // --- DYNAMIC CATEGORY STATE ---
//   const [categories, setCategories] = useState<Category[]>([]);

//   // Filter States
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedSubcategory, setSelectedSubcategory] = useState('');
//   const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
//   const [selectedColors, setSelectedColors] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // Sample data for sizes and colors (replace with your actual data)
// const [availableSizes, setAvailableSizes] = useState<string[]>([]);
// const [availableColors, setAvailableColors] = useState<
//   { name: string; value: string }[]
// >([]);

// const COLOR_MAP: Record<string, string> = {
//   Red: '#ef4444',
//   'Navy Blue': '#1e3a8a',
//   'Charcoal Grey': '#374151',
//   White: '#ffffff',
//   Black: '#000000',
//   Blue: '#3b82f6',
//   Green: '#22c55e',
//   Yellow: '#facc15',
//   Purple: '#a855f7',
//   Pink: '#ec4899',
//   Brown: '#92400e',
// };



// useEffect(() => {
//   const fetchFilters = async () => {
//     try {
//       const { data } = await productFilterApi.getFilters();

//       // Sizes
//       setAvailableSizes(data.SIZE);

//       // Colors (convert string → UI object)
//      setAvailableColors(
//   data.COLOR.map((colorName) => ({
//     name: colorName,
//     value: resolveColor(colorName),
//   }))
// );

//     } catch (error) {
//       console.error('Failed to load filters', error);
//     }
//   };

//   fetchFilters();
// }, []);
  
//   // --- 1. FETCH CATEGORIES ON MOUNT ---
//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const data = await categoryApi.getAllCategories();
//         setCategories(data);
//       } catch (error) {
//         console.error("Failed to load categories");
//       }
//     };
//     loadCategories();
//   }, []);
// useEffect(() => {
//   const fetchWishlist = async () => {
//     try {
//       const data = await wishlistApi.getWishlist();
//       const ids = data.products.map(p => p.id);
//       setWishlistIds(ids);
//     } catch (error) {
//       console.error("Failed to fetch wishlist");
//     }
//   };

//   fetchWishlist();
// }, []);

//   // --- 2. CALCULATE SUBCATEGORIES DYNAMICALLY ---
//   const availableSubcategories = selectedCategory
//     ? (categories.find(c => c.name === selectedCategory)?.subCategories || []).map(s => s.name)
//     : Array.from(new Set(categories.flatMap(c => c.subCategories.map(s => s.name)))).sort();

//   // --- FETCH PRODUCTS WHEN FILTERS CHANGE ---
//   useEffect(() => {
//     fetchProducts();
//   }, [searchQuery, selectedCategory, selectedSubcategory, selectedSizes, selectedColors, priceRange, sortBy, sortOrder, currentPage]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const filters: ProductFilterRequest = {
//         searchQuery: searchQuery || undefined,
//         category: selectedCategory || undefined,
//         subcategory: selectedSubcategory || undefined,
//         // Add size and color filters when you implement them in your API
//         // sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
//         // colors: selectedColors.length > 0 ? selectedColors : undefined,
//         minPrice: priceRange.min || undefined,
//         maxPrice: priceRange.max || undefined,
//         sortBy: sortBy as any,
//         sortOrder,
//         page: currentPage,
//         pageSize: 16, // Increased to show more products
//       };

//       const response = await productApi.searchProducts(filters);
//       setProducts(response.content);
//       setTotalPages(response.totalPages);
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearFilters = () => {
//     setSearchQuery('');
//     setSelectedCategory('');
//     setSelectedSubcategory('');
//     setSelectedSizes([]);
//     setSelectedColors([]);
//     setPriceRange({ min: 0, max: 10000 });
//     setSortBy('createdAt');
//     setSortOrder('DESC');
//     setCurrentPage(0);
//   };

//   const toggleSection = (section: keyof typeof expandedSections) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const toggleSize = (size: string) => {
//     setSelectedSizes(prev =>
//       prev.includes(size)
//         ? prev.filter(s => s !== size)
//         : [...prev, size]
//     );
//   };

//   const toggleColor = (color: string) => {
//     setSelectedColors(prev =>
//       prev.includes(color)
//         ? prev.filter(c => c !== color)
//         : [...prev, color]
//     );
//   };

//   return (
//     <div className="min-h-screen text-foreground bg-background">
//       <Navbar />

//       <div className="pt-12 pb-12 px-4 md:px-6 lg:px-8 w-full">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-sage">
//               Explore Products
//             </h1>
//             <p className="text-muted-foreground mt-2 text-sm md:text-base">
//               Discover your next favorite style
//             </p>
//           </div>

//           {/* Mobile Filter Toggle */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//             className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors"
//           >
//             <TbAdjustmentsHorizontal size={18} />
//             <span className="font-medium">Filters</span>
//           </motion.button>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Filters Sidebar - Sticky */}
//           <AnimatePresence mode="wait">
//             {(isFilterOpen || window.innerWidth >= 1024) && (
//               <motion.div
//                 key="sidebar"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.2 }}
//                 className="lg:w-72 flex-shrink-0"
//               >
//                 <div className="sticky top-28 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
//                   <div className="bg-white dark:bg-gray-900 rounded-xl p-4 space-y-5 border border-gray-200 dark:border-gray-800 shadow-sm">
//                     {/* Header */}
//                     <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
//                       <h3 className="text-lg font-semibold flex items-center gap-2">
//                         <TbAdjustmentsHorizontal size={20} />
//                         Filters
//                       </h3>
//                       <div className="flex items-center gap-3">
//                         <button 
//                           onClick={handleClearFilters}
//                           className="text-sm text-sage hover:text-sage/80 font-medium hover:underline transition-colors"
//                         >
//                           Clear all
//                         </button>
//                         <button 
//                           onClick={() => setIsFilterOpen(false)}
//                           className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                         >
//                           <FiX size={20} />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Search */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           placeholder="Search products..."
//                           className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
//                         />
//                         <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                       </div>
//                     </div>

//                     {/* Category Section */}
//                     <div className="space-y-2">
//                       <button
//                         onClick={() => toggleSection('category')}
//                         className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
//                       >
//                         <span>Category</span>
//                         {expandedSections.category ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
//                       </button>
//                       <AnimatePresence>
//                         {expandedSections.category && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             className="overflow-hidden"
//                           >
//                             <select
//                               value={selectedCategory}
//                               onChange={(e) => {
//                                 setSelectedCategory(e.target.value);
//                                 setSelectedSubcategory('');
//                               }}
//                               className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
//                             >
//                               <option value="">All Categories</option>
//                               {categories.map((cat) => (
//                                 <option key={cat.id} value={cat.name}>
//                                   {cat.name}
//                                 </option>
//                               ))}
//                             </select>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>

//                     {/* Subcategory Section */}
//                     <div className="space-y-2">
//                       <button
//                         onClick={() => toggleSection('subcategory')}
//                         className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
//                       >
//                         <span>Subcategory</span>
//                         {expandedSections.subcategory ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
//                       </button>
//                       <AnimatePresence>
//                         {expandedSections.subcategory && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             className="overflow-hidden"
//                           >
//                             <select
//                               value={selectedSubcategory}
//                               onChange={(e) => setSelectedSubcategory(e.target.value)}
//                               className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
//                             >
//                               <option value="">All Subcategories</option>
//                               {availableSubcategories.map((subName) => (
//                                 <option key={subName} value={subName}>
//                                   {subName}
//                                 </option>
//                               ))}
//                             </select>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>

//                     {/* Price Range Section */}
//                     <div className="space-y-3">
//                       <button
//                         onClick={() => toggleSection('price')}
//                         className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
//                       >
//                         <span>Price Range</span>
//                         {expandedSections.price ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
//                       </button>
//                       <AnimatePresence>
//                         {expandedSections.price && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             className="overflow-hidden"
//                           >
//                             <div className="pt-1">
//                               <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
//                                 <span>{formatINR(priceRange.min)}</span>
//                                 <span>{formatINR(priceRange.max)}</span>
//                               </div>
//                               <div className="relative pt-1">
//                                 <input
//                                   type="range"
//                                   min="0"
//                                   max="10000"
//                                   step="100"
//                                   value={priceRange.max}
//                                   onChange={(e) =>
//                                     setPriceRange({ ...priceRange, max: Number(e.target.value) })
//                                   }
//                                   className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sage"
//                                 />
//                               </div>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>

//                     {/* Size Section */}
//                    {/* Size Section */}
// <div className="space-y-2">
//   <button
//     onClick={() => toggleSection('size')}
//     className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
//   >
//     <span>Size</span>
//     {expandedSections.size ? (
//       <FiChevronUp size={18} />
//     ) : (
//       <FiChevronDown size={18} />
//     )}
//   </button>

//   <AnimatePresence>
//     {expandedSections.size && (
//       <motion.div
//         initial={{ height: 0, opacity: 0 }}
//         animate={{ height: 'auto', opacity: 1 }}
//         exit={{ height: 0, opacity: 0 }}
//         className="overflow-hidden"
//       >
//         <div className="flex flex-wrap gap-2 pt-1">
//           {availableSizes.map((size) => (
//             <button
//               key={size}
//               onClick={() => toggleSize(size)}
//               className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
//                 selectedSizes.includes(size)
//                   ? 'bg-sage text-white border-sage shadow-sm'
//                   : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-sage hover:text-sage'
//               }`}
//             >
//               {size}
//             </button>
//           ))}
//         </div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// </div>


//                     {/* Color Section */}
//                     {/* Color Section */}
// <div className="space-y-2">
//   <button
//     onClick={() => toggleSection('color')}
//     className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
//   >
//     <span>Color</span>
//     {expandedSections.color ? (
//       <FiChevronUp size={18} />
//     ) : (
//       <FiChevronDown size={18} />
//     )}
//   </button>

//   <AnimatePresence>
//     {expandedSections.color && (
//       <motion.div
//         initial={{ height: 0, opacity: 0 }}
//         animate={{ height: 'auto', opacity: 1 }}
//         exit={{ height: 0, opacity: 0 }}
//         className="overflow-hidden"
//       >
//         <div className="grid grid-cols-5 gap-2 pt-1">
//           {availableColors.map((color) => {
//             const isSelected = selectedColors.includes(color.name);

//             return (
//               <button
//                 key={color.name}
//                 type="button"
//                 onClick={() => toggleColor(color.name)}
//                 title={color.name}
//                 style={{ backgroundColor: color.value }}
//                 className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${
//                   isSelected
//                     ? 'border-sage ring-2 ring-sage/30'
//                     : 'border-white dark:border-gray-800'
//                 }`}
//               >
//                 {isSelected && (
//                   <div className="w-5 h-5 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center">
//                     <div className="w-2 h-2 rounded-full bg-sage" />
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// </div>




               
//                     {/* Sort Section */}
//                     <div className="space-y-2">
//                       <button
//                         onClick={() => toggleSection('sort')}
//                         className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
//                       >
//                         <span>Sort By</span>
//                         {expandedSections.sort ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
//                       </button>
//                       <AnimatePresence>
//                         {expandedSections.sort && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             className="overflow-hidden space-y-2 pt-1"
//                           >
//                             <select
//                               value={sortBy}
//                               onChange={(e) => setSortBy(e.target.value)}
//                               className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
//                             >
//                               <option value="createdAt">Newest</option>
//                               <option value="price">Price</option>
//                               <option value="name">Name</option>
//                             </select>
//                             <select
//                               value={sortOrder}
//                               onChange={(e) => setSortOrder(e.target.value as 'ASC' | 'DESC')}
//                               className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
//                             >
//                               <option value="DESC">Descending</option>
//                               <option value="ASC">Ascending</option>
//                             </select>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Products Grid Area - Scrollable */}
//           <div className="flex-1 min-w-0">
//             {/* Active Filters Display */}
//             {(selectedCategory || selectedSubcategory || selectedSizes.length > 0 || selectedColors.length > 0) && (
//               <div className="mb-6 flex flex-wrap gap-2">
//                 {selectedCategory && (
//                   <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-sm">
//                     <span className="font-medium">{selectedCategory}</span>
//                     <button 
//                       onClick={() => setSelectedCategory('')} 
//                       className="ml-1 hover:bg-sage/20 p-0.5 rounded-full transition-colors"
//                     >
//                       <FiX size={14} />
//                     </button>
//                   </div>
//                 )}
//                 {selectedSubcategory && (
//                   <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-sm">
//                     <span className="font-medium">{selectedSubcategory}</span>
//                     <button 
//                       onClick={() => setSelectedSubcategory('')} 
//                       className="ml-1 hover:bg-sage/20 p-0.5 rounded-full transition-colors"
//                     >
//                       <FiX size={14} />
//                     </button>
//                   </div>
//                 )}
//                 {selectedSizes.map(size => (
//                   <div key={size} className="inline-flex items-center gap-1 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-sm">
//                     <span className="font-medium">Size: {size}</span>
//                     <button 
//                       onClick={() => toggleSize(size)} 
//                       className="ml-1 hover:bg-sage/20 p-0.5 rounded-full transition-colors"
//                     >
//                       <FiX size={14} />
//                     </button>
//                   </div>
//                 ))}
//                 {selectedColors.map(color => (
//                   <div key={color} className="inline-flex items-center gap-1 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-sm">
//                     <span className="font-medium">Color: {color}</span>
//                     <button 
//                       onClick={() => toggleColor(color)} 
//                       className="ml-1 hover:bg-sage/20 p-0.5 rounded-full transition-colors"
//                     >
//                       <FiX size={14} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Products Grid - 4 columns */}
//             {loading ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//                 {[...Array(12)].map((_, i) => (
//                   <div key={i} className="animate-pulse">
//                     <div className="bg-gray-200 dark:bg-gray-800 rounded-xl aspect-square mb-2"></div>
//                     <div className="space-y-2">
//                       <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
//                       <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
//                       <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : products.length === 0 ? (
//               <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-800 shadow-sm">
//                 <div className="text-gray-400 dark:text-gray-600 mb-4">
//                   <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No products found</p>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Try adjusting your filters to find what you're looking for</p>
//                 <button 
//                   onClick={handleClearFilters} 
//                   className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors font-medium"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             ) : (
//               <>
//                 {/* Products Grid */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//                   {products.map((product) => (
//                     <div key={product.id} className="group">
//                     <ProductCard
//   product={product}
//   compact={true}
//   className="transform transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1"

//   /* 👇 ADD THESE TWO LINES */
//   isWishlisted={wishlistIds.includes(product.id)}
// onWishlistToggle={(productId: number) => {
//   setWishlistIds(prev =>
//     prev.includes(productId)
//       ? prev.filter(id => id !== productId) // remove
//       : [...prev, productId]                // add
//   );
// }}
// />
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
//                     <button
//                       onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
//                       disabled={currentPage === 0}
//                       className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                       </svg>
//                       Previous
//                     </button>
//                     <div className="flex items-center gap-2">
//                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                         let pageNum;
//                         if (totalPages <= 5) {
//                           pageNum = i;
//                         } else if (currentPage < 3) {
//                           pageNum = i;
//                         } else if (currentPage > totalPages - 4) {
//                           pageNum = totalPages - 5 + i;
//                         } else {
//                           pageNum = currentPage - 2 + i;
//                         }
                        
//                         return (
//                           <button
//                             key={pageNum}
//                             onClick={() => setCurrentPage(pageNum)}
//                             className={`w-9 h-9 rounded-lg flex items-center justify-center font-medium ${
//                               currentPage === pageNum
//                                 ? 'bg-sage text-white'
//                                 : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
//                             }`}
//                           >
//                             {pageNum + 1}
//                           </button>
//                         );
//                       })}
//                     </div>
//                     <span className="text-sm text-gray-600 dark:text-gray-400">
//                       Page {currentPage + 1} of {totalPages}
//                     </span>
//                     <button
//                       onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
//                       disabled={currentPage === totalPages - 1}
//                       className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
//                     >
//                       Next
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductsPage;


import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import Navbar from '../../components/layout/Navbar';
import ProductCard from '../../components/product/ProductCard';
import { productApi } from '../../api/productApi';
import { categoryApi, type Category } from '../../api/categoryApi';
import type { Product, ProductFilterRequest } from '../../types';
import toast from 'react-hot-toast';
import { Footer } from '../../components/layout/Footer';
import { formatINR } from '../../utils/currency';
import { wishlistApi } from "../../api/wishlistApi";
import productFilterApi from '../../api/productFilterApi';
import { resolveColor } from "../../utils/colorResolver";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    subcategory: true,
    price: true,
    size: true,
    color: true,
    sort: false
  });

  // --- DYNAMIC CATEGORY STATE ---
  const [categories, setCategories] = useState<Category[]>([]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Available filters from API
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<
    { name: string; value: string }[]
  >([]);

  // Debounce timer for search
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await productFilterApi.getFilters();

        // Sizes
        setAvailableSizes(data.SIZE || []);

        // Colors (convert string → UI object)
        setAvailableColors(
          (data.COLOR || []).map((colorName) => ({
            name: colorName,
            value: resolveColor(colorName),
          }))
        );
      } catch (error) {
        console.error('Failed to load filters', error);
        toast.error('Failed to load filter options');
      }
    };

    fetchFilters();
  }, []);
  
  // --- 1. FETCH CATEGORIES ON MOUNT ---
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryApi.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await wishlistApi.getWishlist();
        const ids = data.products.map(p => p.id);
        setWishlistIds(ids);
      } catch (error) {
        console.error("Failed to fetch wishlist");
      }
    };

    fetchWishlist();
  }, []);

  // --- 2. CALCULATE SUBCATEGORIES DYNAMICALLY ---
  const availableSubcategories = selectedCategory
    ? (categories.find(c => c.name === selectedCategory)?.subCategories || []).map(s => s.name)
    : Array.from(new Set(categories.flatMap(c => c.subCategories.map(s => s.name)))).sort();

  // Debounced search function
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(0); // Reset to first page on search
  }, []);

  // Real-time filtering effect
  useEffect(() => {
    // Debounce search input
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchProducts();
    }, 500); // 500ms debounce for search

    setSearchTimeout(timeout);

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery, selectedCategory, selectedSubcategory, selectedSizes, selectedColors, priceRange, sortBy, sortOrder]);

  // Fetch products when page changes
  useEffect(() => {
    if (currentPage !== 0) { // Don't fetch on initial mount, it's handled above
      fetchProducts();
    }
  }, [currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const filters: ProductFilterRequest = {
        searchQuery: searchQuery || undefined,
        category: selectedCategory || undefined,
        subcategory: selectedSubcategory || undefined,
        sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
        colors: selectedColors.length > 0 ? selectedColors : undefined,
        minPrice: priceRange.min > 0 ? priceRange.min : undefined,
        maxPrice: priceRange.max < 10000 ? priceRange.max : undefined,
        sortBy: sortBy as any,
        sortOrder,
        page: currentPage,
        pageSize: 16,
      };

      const response = await productApi.searchProducts(filters);
      setProducts(response.content);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      toast.error(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('createdAt');
    setSortOrder('DESC');
    setCurrentPage(0);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSize = (size: string) => {
    setCurrentPage(0); // Reset to first page when filter changes
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setCurrentPage(0); // Reset to first page when filter changes
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setCurrentPage(0); // Reset to first page when filter changes
    if (type === 'min') {
      const minVal = Math.max(0, Math.min(value, priceRange.max - 100));
      setPriceRange({ ...priceRange, min: minVal });
    } else {
      const maxVal = Math.min(10000, Math.max(value, priceRange.min + 100));
      setPriceRange({ ...priceRange, max: maxVal });
    }
  };

  const handleCategoryChange = (value: string) => {
    setCurrentPage(0);
    setSelectedCategory(value);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (value: string) => {
    setCurrentPage(0);
    setSelectedSubcategory(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleSortOrderChange = (value: 'ASC' | 'DESC') => {
    setSortOrder(value);
  };

  return (
    <div className="min-h-screen text-foreground bg-background">
      <Navbar />

      <div className="pt-12 pb-12 px-4 md:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-sage">
              Explore Products
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Discover your next favorite style
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors"
          >
            <TbAdjustmentsHorizontal size={18} />
            <span className="font-medium">Filters</span>
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Sticky */}
          <AnimatePresence mode="wait">
            {(isFilterOpen || window.innerWidth >= 1024) && (
              <motion.div
                key="sidebar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="lg:w-72 flex-shrink-0"
              >
                <div className="sticky top-28 pr-2">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 space-y-5 border border-gray-200 dark:border-gray-800 shadow-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <TbAdjustmentsHorizontal size={20} />
                        Filters
                      </h3>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={handleClearFilters}
                          className="text-sm text-sage hover:text-sage/80 font-medium hover:underline transition-colors"
                        >
                          Clear all
                        </button>
                        <button 
                          onClick={() => setIsFilterOpen(false)}
                          className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          <FiX size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Search */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          placeholder="Search products..."
                          className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
                        />
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>

                    {/* Category Section */}
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleSection('category')}
                        className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
                      >
                        <span>Category</span>
                        {expandedSections.category ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                      </button>
                      <AnimatePresence>
                        {expandedSections.category && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <select
                              value={selectedCategory}
                              onChange={(e) => handleCategoryChange(e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                            >
                              <option value="">All Categories</option>
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Subcategory Section */}
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleSection('subcategory')}
                        className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
                      >
                        <span>Subcategory</span>
                        {expandedSections.subcategory ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                      </button>
                      <AnimatePresence>
                        {expandedSections.subcategory && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <select
                              value={selectedSubcategory}
                              onChange={(e) => handleSubcategoryChange(e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                            >
                              <option value="">All Subcategories</option>
                              {availableSubcategories.map((subName) => (
                                <option key={subName} value={subName}>
                                  {subName}
                                </option>
                              ))}
                            </select>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Price Range Section */}
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleSection('price')}
                        className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
                      >
                        <span>Price Range</span>
                        {expandedSections.price ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                      </button>
                      <AnimatePresence>
                        {expandedSections.price && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2">
                              {/* Editable Price Inputs */}
                              <div className="flex gap-3 mb-4">
                                <div className="flex-1">
                                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Min Price</label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10000"
                                      value={priceRange.min}
                                      onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                                      className="w-full pl-8 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                                    />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Max Price</label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input
                                      type="number"
                                      min="0"
                                      max="10000"
                                      value={priceRange.max}
                                      onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                                      className="w-full pl-8 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Dual Range Slider */}
                              <div className="relative pt-1 pb-6">
                                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-3">
                                  <span>{formatINR(0)}</span>
                                  <span>{formatINR(10000)}</span>
                                </div>
                                
                                {/* Slider Track */}
                                <div className="relative h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                                  {/* Selected Range */}
                                  <div 
                                    className="absolute h-1.5 bg-sage rounded-full"
                                    style={{
                                      left: `${(priceRange.min / 10000) * 100}%`,
                                      right: `${100 - (priceRange.max / 10000) * 100}%`
                                    }}
                                  />
                                  
                                  {/* Min Thumb */}
                                  <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={priceRange.min}
                                    onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                                    className="absolute w-full h-1.5 opacity-0 cursor-pointer z-20"
                                  />
                                  
                                  {/* Max Thumb */}
                                  <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={priceRange.max}
                                    onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                                    className="absolute w-full h-1.5 opacity-0 cursor-pointer z-20"
                                  />
                                  
                                  {/* Min Thumb Visual */}
                                  <div 
                                    className="absolute w-4 h-4 bg-sage rounded-full border-2 border-white shadow-md -translate-y-1/2 z-10"
                                    style={{ left: `${(priceRange.min / 10000) * 100}%`, top: '50%' }}
                                  />
                                  
                                  {/* Max Thumb Visual */}
                                  <div 
                                    className="absolute w-4 h-4 bg-sage rounded-full border-2 border-white shadow-md -translate-y-1/2 z-10"
                                    style={{ left: `${(priceRange.max / 10000) * 100}%`, top: '50%' }}
                                  />
                                </div>
                                
                                {/* Current Values Display */}
                                <div className="flex justify-between mt-4 text-sm">
                                  <span className="font-medium text-sage">{formatINR(priceRange.min)}</span>
                                  <span className="font-medium text-sage">{formatINR(priceRange.max)}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Size Section */}
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleSection('size')}
                        className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
                      >
                        <span>Size</span>
                        {expandedSections.size ? (
                          <FiChevronUp size={18} />
                        ) : (
                          <FiChevronDown size={18} />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedSections.size && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-2 pt-1">
                              {availableSizes.length > 0 ? (
                                availableSizes.map((size) => (
                                  <button
                                    key={size}
                                    onClick={() => toggleSize(size)}
                                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                                      selectedSizes.includes(size)
                                        ? 'bg-sage text-white border-sage shadow-sm'
                                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-sage hover:text-sage'
                                    }`}
                                  >
                                    {size}
                                  </button>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 py-2">No sizes available</p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Color Section */}
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleSection('color')}
                        className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
                      >
                        <span>Color</span>
                        {expandedSections.color ? (
                          <FiChevronUp size={18} />
                        ) : (
                          <FiChevronDown size={18} />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedSections.color && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {availableColors.length > 0 ? (
                              <div className="grid grid-cols-5 gap-2 pt-1">
                                {availableColors.map((color) => {
                                  const isSelected = selectedColors.includes(color.name);

                                  return (
                                    <button
  key={color.name}
  type="button"
  onClick={() => toggleColor(color.name)}
  title={color.name}
  style={{ backgroundColor: color.value }}
  className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110
    ${
      isSelected
        ? 'border-sage ring-2 ring-sage/30'
        : color.name.toLowerCase() === 'white'
          ? 'border-gray-400'
          : 'border-transparent'
    }
  `}
>
                                      {isSelected && (
                                        <div className="w-5 h-5 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center">
                                          <div className="w-2 h-2 rounded-full bg-sage" />
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 dark:text-gray-400 py-2">No colors available</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                   
                    {/* Sort Section */}
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleSection('sort')}
                        className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 py-2 hover:text-sage transition-colors"
                      >
                        <span>Sort By</span>
                        {expandedSections.sort ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                      </button>
                      <AnimatePresence>
                        {expandedSections.sort && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-2 pt-1"
                          >
                            <select
                              value={sortBy}
                              onChange={(e) => handleSortChange(e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                            >
                              <option value="createdAt">Newest</option>
                              <option value="price">Price</option>
                              <option value="name">Name</option>
                            </select>
                            <select
                              value={sortOrder}
                              onChange={(e) => handleSortOrderChange(e.target.value as 'ASC' | 'DESC')}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                            >
                              <option value="DESC">Descending</option>
                              <option value="ASC">Ascending</option>
                            </select>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid Area - Scrollable */}
          <div className="flex-1 min-w-0">
            {/* Active Filters Display */}
            {(selectedCategory || selectedSubcategory || selectedSizes.length > 0 || selectedColors.length > 0 || priceRange.min > 0 || priceRange.max < 10000) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategory && (
                  <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-sm">
                    <span className="font-medium">{selectedCategory}</span>
                    <button 
                      onClick={() => {
                        setSelectedCategory('');
                        setCurrentPage(0);
                      }} 
                      className="ml-1 hover:bg-sage/20 p-0.5 rounded-full transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                )}
                {selectedSubcategory && (
                  <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-sm">
                    <span className="font-medium">{selectedSubcategory}</span>
                    <button 
                      onClick={() => {
                        setSelectedSubcategory('');
                        setCurrentPage(0);
                      }} 
                      className="ml-1 hover:bg-sage/20 p-0.5 rounded-full transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                )}
                {selectedSizes.map(size => (
                  <div key={size} className="inline-flex items-center gap-1 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-sm">
                    <span className="font-medium">Size: {size}</span>
                    <button 
                      onClick={() => toggleSize(size)} 
                      className="ml-1 hover:bg-sage/20 p-0.5 rounded-full transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
                {selectedColors.map(color => (
                  <div key={color} className="inline-flex items-center gap-1 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-sm">
                    <span className="font-medium">Color: {availableColors.find(c => c.name === color)?.name || color}</span>
                    <button 
                      onClick={() => toggleColor(color)} 
                      className="ml-1 hover:bg-sage/20 p-0.5 rounded-full transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
                {(priceRange.min > 0 || priceRange.max < 10000) && (
                  <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-sm">
                    <span className="font-medium">
                      Price: {formatINR(priceRange.min)} - {formatINR(priceRange.max)}
                    </span>
                    <button 
                      onClick={() => {
                        setPriceRange({ min: 0, max: 10000 });
                        setCurrentPage(0);
                      }} 
                      className="ml-1 hover:bg-sage/20 p-0.5 rounded-full transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Products Grid - 4 columns */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-xl aspect-square mb-2"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No products found</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Try adjusting your filters to find what you're looking for</p>
                <button 
                  onClick={handleClearFilters} 
                  className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Products Count */}
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Showing {products.length} products
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="group">
                      <ProductCard
                        product={product}
                        compact={true}
                        className="transform transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1"
                        isWishlisted={wishlistIds.includes(product.id)}
                        onWishlistToggle={(productId: number) => {
                          setWishlistIds(prev =>
                            prev.includes(productId)
                              ? prev.filter(id => id !== productId)
                              : [...prev, productId]
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <button
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i;
                        } else if (currentPage < 3) {
                          pageNum = i;
                        } else if (currentPage > totalPages - 4) {
                          pageNum = totalPages - 5 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center font-medium ${
                              currentPage === pageNum
                                ? 'bg-sage text-white'
                                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            {pageNum + 1}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPage + 1} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage === totalPages - 1}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;