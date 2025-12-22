import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import ProductCard from '../../components/product/ProductCard';
import { productApi } from '../../api/productApi';
import { categoryApi, type Category } from '../../api/categoryApi'; // 👈 Import Category API
import type { Product, ProductFilterRequest } from '../../types';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- DYNAMIC CATEGORY STATE ---
  const [categories, setCategories] = useState<Category[]>([]); // 👈 Store DB Data

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

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

  // --- 2. CALCULATE SUBCATEGORIES DYNAMICALLY ---
  // If a category is selected, show ONLY its subcategories.
  // If NO category is selected, show ALL unique subcategories (flattened list).
  const availableSubcategories = selectedCategory
    ? (categories.find(c => c.name === selectedCategory)?.subCategories || []).map(s => s.name)
    : Array.from(new Set(categories.flatMap(c => c.subCategories.map(s => s.name)))).sort();

  // --- FETCH PRODUCTS WHEN FILTERS CHANGE ---
  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, selectedSubcategory, priceRange, sortBy, sortOrder, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const filters: ProductFilterRequest = {
        searchQuery: searchQuery || undefined,
        category: selectedCategory || undefined,
        subcategory: selectedSubcategory || undefined,
        minPrice: priceRange.min || undefined,
        maxPrice: priceRange.max || undefined,
        sortBy: sortBy as any,
        sortOrder,
        page: currentPage,
        pageSize: 12,
      };

      const response = await productApi.searchProducts(filters);
      setProducts(response.content);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('createdAt');
    setSortOrder('DESC');
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-white">Explore Products</h1>
            <p className="text-dark-400 mt-2">Discover your next favorite style</p>
          </div>

          {/* Mobile Filter Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden btn-primary flex items-center space-x-2"
          >
            <FiFilter />
            <span>Filters</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="md:col-span-1 space-y-6"
              >
                <div className="glass-card rounded-2xl p-6 space-y-6">
                  {/* Close Button (Mobile) */}
                  <div className="flex items-center justify-between md:hidden">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <FiX size={24} />
                    </button>
                  </div>

                  {/* Search */}
                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="input-field pl-10"
                      />
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
                    </div>
                  </div>

                  {/* Dynamic Category Dropdown */}
                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedSubcategory(''); // Reset subcategory when category changes
                      }}
                      className="input-field bg-dark-900"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Subcategory Dropdown */}
                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">
                      Subcategory
                    </label>
                    <select
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="input-field bg-dark-900"
                    >
                      <option value="">All Subcategories</option>
                      {availableSubcategories.map((subName) => (
                        <option key={subName} value={subName}>
                          {subName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">
                      Price Range: ${priceRange.min} - ${priceRange.max}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, max: Number(e.target.value) })
                        }
                        className="w-full accent-primary-500"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-field mb-2 bg-dark-900"
                    >
                      <option value="createdAt">Newest</option>
                      <option value="price">Price</option>
                      <option value="name">Name</option>
                    </select>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'ASC' | 'DESC')}
                      className="input-field bg-dark-900"
                    >
                      <option value="DESC">Descending</option>
                      <option value="ASC">Ascending</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <button onClick={handleClearFilters} className="w-full btn-ghost">
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass-card rounded-2xl h-96 shimmer" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <p className="text-dark-400 text-lg">No products found</p>
                <button onClick={handleClearFilters} className="btn-primary mt-4">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="btn-ghost disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-dark-300">
                      Page {currentPage + 1} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage === totalPages - 1}
                      className="btn-ghost disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;