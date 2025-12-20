import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiImage } from 'react-icons/fi';
import { productApi } from '../../api/productApi';
import type { Product, CreateProductRequest } from '../../types';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: '',
    description: '',
    price: 0,
    salePrice: 0,
    stock: 0,
    category: '',
    subcategory: '',
    images: [],
    videos: [],
    attributes: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAllProducts(0, 50);
      setProducts(response.content);
    } catch (error: any) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice || 0,
        stock: product.stock,
        category: product.category,
        subcategory: product.subcategory,
        images: product.images,
        videos: product.videos || [],
        attributes: product.attributes,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        salePrice: 0,
        stock: 0,
        category: '',
        subcategory: '',
        images: [],
        videos: [],
        attributes: [],
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || formData.price <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingProduct) {
        await productApi.updateProduct(editingProduct.id, formData);
        toast.success('Product updated successfully');
      } else {
        await productApi.createProduct(formData);
        toast.success('Product created successfully');
      }
      handleCloseModal();
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productApi.deleteProduct(id);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error: any) {
      toast.error('Failed to delete product');
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      await productApi.deactivateProduct(id);
      toast.success('Product deactivated successfully');
      fetchProducts();
    } catch (error: any) {
      toast.error('Failed to deactivate product');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'salePrice' || name === 'stock' ? Number(value) : value,
    }));
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Product Management</h2>
          <p className="text-dark-400 mt-1">{products.length} products total</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center space-x-2"
        >
          <FiPlus />
          <span>Add Product</span>
        </motion.button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl h-64 shimmer" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-dark-400 mb-4">No products yet</p>
          <button onClick={() => handleOpenModal()} className="btn-primary">
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              className="glass-card-hover rounded-2xl overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-square bg-dark-900 relative">
                <img
                  src={product.images[0] || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.isActive && (
                  <div className="absolute inset-0 bg-dark-950/80 flex items-center justify-center">
                    <span className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg">
                      Inactive
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-dark-400 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold gradient-text">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.salePrice && (
                      <p className="text-sm text-dark-500 line-through">
                        ${product.salePrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-dark-800 text-dark-300 text-sm rounded-lg">
                    Stock: {product.stock}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenModal(product)}
                    className="flex-1 p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FiEdit2 className="mx-auto text-primary-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeactivate(product.id)}
                    className="flex-1 p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-orange-400">⏸</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 p-2 glass-card rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FiTrash2 className="mx-auto text-red-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="backdrop-overlay"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button onClick={handleCloseModal}>
                    <FiX size={24} className="text-dark-400 hover:text-white" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Category *
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Subcategory *
                      </label>
                      <input
                        type="text"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Stock *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Price * ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-dark-300 mb-2 block">
                        Sale Price ($)
                      </label>
                      <input
                        type="number"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleInputChange}
                        className="input-field"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="input-field min-h-[100px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-dark-300 mb-2 block">
                      Images
                    </label>
                    <div className="space-y-2">
                      {formData.images.map((img, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={img}
                            readOnly
                            className="input-field flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-2 glass-card rounded-lg hover:bg-red-500/20 text-red-400"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addImageUrl}
                        className="btn-ghost w-full flex items-center justify-center space-x-2"
                      >
                        <FiImage />
                        <span>Add Image URL</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button type="submit" className="flex-1 btn-primary">
                      {editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                    <button type="button" onClick={handleCloseModal} className="flex-1 btn-ghost">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;