import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiImage, FiFolder, FiGrid, FiPause, FiPlay, FiEye, FiSearch } from 'react-icons/fi';
import { productApi } from '../../api/productApi';
import { categoryApi, type Category } from '../../api/categoryApi';
import type { Product, CreateProductRequest, ProductAttribute } from '../../types';
import toast from 'react-hot-toast';

// --- CONFIGURATION ---
const SERVER_URL = import.meta.env.VITE_API_IMG_URL || 'http://192.168.1.111:8090';

// Define the modes for our modal system
type ModalType = 'NONE' | 'PRODUCT' | 'CATEGORY' | 'SUBCATEGORY' | 'PRODUCT_VIEW';
type AdminTab = 'CATEGORY' | 'SUBCATEGORY' | 'PRODUCT';

const AdminProducts = () => {
  // --- DATA STATE ---
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [videoPreviewUrls, setVideoPreviewUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // --- MODAL STATE ---
  const [activeModal, setActiveModal] = useState<ModalType>('NONE');
  const [activeTab, setActiveTab] = useState<AdminTab>('PRODUCT');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubCategory, setEditingSubCategory] = useState<any>(null);

  // --- FORMS STATE ---
  const [productForm, setProductForm] = useState<CreateProductRequest>({
    name: '', description: '', price: 0, salePrice: 0, stock: 0,
    category: '', subcategory: '', images: [], videos: [], attributes: [],
  });

  const [sizesInput, setSizesInput] = useState('');
  const [colorsInput, setColorsInput] = useState('');
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [subCatForm, setSubCatForm] = useState({ parentCategoryId: '', name: '', description: '' });

  // --- COLUMN FILTERS ---
  const [columnFilters, setColumnFilters] = useState({
    item: '',
    subcategory: '',
    category: '',
    status: ''
  });

  // --- PAGINATION ---
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- HELPER: RESOLVE IMAGE URL ---
  const getImageUrl = (path?: string) => {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    return `${SERVER_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        productApi.getAllProducts(0, 1000),
        categoryApi.getAllCategories()
      ]);
      setProducts(Array.isArray(prodRes.content) ? prodRes.content : 
                  Array.isArray(prodRes) ? prodRes : []);
      setCategories(Array.isArray(catRes) ? catRes : []);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // --- AVAILABLE SUBCATEGORIES ---
  const availableSubCategories = useMemo(() => {
    if (!productForm.category || !categories || !Array.isArray(categories)) return [];
    const category = categories.find(c => c.name === productForm.category);
    return category?.subCategories || [];
  }, [categories, productForm.category]);

  // --- FILTERED DATA ---
  const filteredCategories = useMemo(() => {
    if (!categories || !Array.isArray(categories)) return [];
    return categories
      .filter(cat =>
        cat.name.toLowerCase().includes(columnFilters.item.toLowerCase()) ||
        cat.description?.toLowerCase().includes(columnFilters.item.toLowerCase())
      )
      .sort((a, b) => b.id - a.id);
  }, [categories, columnFilters.item]);

  const subCategoryRows = useMemo(() => {
    if (!categories || !Array.isArray(categories)) return [];
    return categories.flatMap(cat =>
      (cat.subCategories || []).map(sub => ({
        ...sub,
        parentName: cat.name,
        parentId: cat.id
      }))
    ).sort((a, b) => b.id - a.id);
  }, [categories]);

  const filteredSubCategories = useMemo(() => {
    if (!subCategoryRows || !Array.isArray(subCategoryRows)) return [];
    return subCategoryRows.filter(sub =>
      sub.name.toLowerCase().includes(columnFilters.item.toLowerCase()) ||
      (sub.parentName || '').toLowerCase().includes(columnFilters.item.toLowerCase())
    );
  }, [subCategoryRows, columnFilters.item]);

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    
    return products
      .filter(prod => {
        const matchesItem = (prod.name || '').toLowerCase().includes(columnFilters.item.toLowerCase());
        const matchesSubcategory = (prod.subcategory || '').toLowerCase().includes(columnFilters.subcategory.toLowerCase());
        const matchesCategory = (prod.category || '').toLowerCase().includes(columnFilters.category.toLowerCase());
        const matchesStatus = 
          columnFilters.status === '' || 
          (columnFilters.status === 'ACTIVE' && prod.isActive) || 
          (columnFilters.status === 'INACTIVE' && !prod.isActive);
        
        return matchesItem && matchesSubcategory && matchesCategory && matchesStatus;
      })
      .sort((a, b) => b.id - a.id);
  }, [products, columnFilters]);

  // --- PAGINATION CALCULATIONS ---
  const paginatedCategories = useMemo(() => {
    if (!filteredCategories || !Array.isArray(filteredCategories)) return [];
    return filteredCategories.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredCategories, page, rowsPerPage]);

  const paginatedSubCategories = useMemo(() => {
    if (!filteredSubCategories || !Array.isArray(filteredSubCategories)) return [];
    return filteredSubCategories.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredSubCategories, page, rowsPerPage]);

  const paginatedProducts = useMemo(() => {
    if (!filteredProducts || !Array.isArray(filteredProducts)) return [];
    return filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredProducts, page, rowsPerPage]);

  const totalPages = useMemo(() => {
    const itemCount = 
      activeTab === 'CATEGORY' ? (filteredCategories?.length || 0) :
      activeTab === 'SUBCATEGORY' ? (filteredSubCategories?.length || 0) :
      (filteredProducts?.length || 0);
    
    return Math.ceil(itemCount / rowsPerPage);
  }, [activeTab, filteredCategories, filteredSubCategories, filteredProducts, rowsPerPage]);

  // --- MODAL HANDLERS ---
  const openProductViewModal = (product: Product) => {
    setViewingProduct(product);
    setActiveModal('PRODUCT_VIEW');
  };

  const openProductEditModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        salePrice: product.salePrice || 0,
        stock: product.stock || 0,
        category: product.category || '',
        subcategory: product.subcategory || '',
        images: product.images || [],
        videos: product.videos || [],
        attributes: product.attributes || [],
      });
      
      const sizes = product.attributes
        ?.filter((attr: any) => attr.type === 'Size' || attr.type === 'size')
        .map((attr: any) => attr.value)
        .join(', ') || '';
      
      const colors = product.attributes
        ?.filter((attr: any) => attr.type === 'Color' || attr.type === 'color' || attr.type === 'Colour')
        .map((attr: any) => attr.value)
        .join(', ') || '';
      
      setSizesInput(sizes);
      setColorsInput(colors);
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '', description: '', price: 0, salePrice: 0, stock: 0,
        category: '', subcategory: '', images: [], videos: [], attributes: [],
      });
      setSizesInput('');
      setColorsInput('');
    }
    setActiveModal('PRODUCT');
  };

  const openCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ name: category.name || '', description: category.description || '' });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: '', description: '' });
    }
    setActiveModal('CATEGORY');
  };

  const openSubCategoryModal = (subCategory?: any) => {
    if (subCategory) {
      setEditingSubCategory(subCategory);
      setSubCatForm({
        parentCategoryId: subCategory.parentId?.toString() || '',
        name: subCategory.name || '',
        description: subCategory.description || ''
      });
    } else {
      setEditingSubCategory(null);
      setSubCatForm({ parentCategoryId: '', name: '', description: '' });
    }
    setActiveModal('SUBCATEGORY');
  };

  const closeModal = () => {
    setActiveModal('NONE');
    setEditingProduct(null);
    setViewingProduct(null);
    setEditingCategory(null);
    setEditingSubCategory(null);
    setSelectedFiles([]);
    setPreviewUrls([]);
    setSelectedVideos([]);
    setVideoPreviewUrls([]);
  };

  // --- FILE HANDLERS ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedVideos(prev => [...prev, ...files]);
      const previews = files.map(file => URL.createObjectURL(file));
      setVideoPreviewUrls(prev => [...prev, ...previews]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setSelectedVideos(prev => prev.filter((_, i) => i !== index));
    setVideoPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // --- FORM SUBMIT HANDLERS ---
const handleProductSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const t = toast.loading(editingProduct ? 'Updating product...' : 'Creating product...');
  
  try {
    const formData = new FormData();
    const updatedAttributes: any[] = [];
    
    // Process Sizes/Colors into Attributes
    if (sizesInput.trim()) {
      sizesInput.split(',').map(s => s.trim()).filter(Boolean)
        .forEach(size => updatedAttributes.push({ type: 'Size', value: size }));
    }
    if (colorsInput.trim()) {
      colorsInput.split(',').map(c => c.trim()).filter(Boolean)
        .forEach(color => updatedAttributes.push({ type: 'Color', value: color }));
    }

    // Prepare the JSON part (Contains existing image/video URLs)
    const productData = {
      name: productForm.name,
      description: productForm.description,
      price: productForm.price,
      salePrice: productForm.salePrice,
      stock: productForm.stock,
      category: productForm.category,
      subcategory: productForm.subcategory,
      images: productForm.images, // These are existing URL strings
      videos: productForm.videos, // These are existing URL strings
      attributes: updatedAttributes,
      isActive: editingProduct ? editingProduct.isActive : true
    };

    const productBlob = new Blob([JSON.stringify(productData)], { type: 'application/json' });
    formData.append('product', productBlob);

    // Append NEW binary files
    selectedFiles.forEach((file) => formData.append('imageFiles', file));
    selectedVideos.forEach((video) => formData.append('videoFiles', video));

    if (editingProduct) {
      // FIX: Use formData instead of productData
      await productApi.updateProduct(editingProduct.id, formData);
      toast.success('Product updated successfully', { id: t });
    } else {
      await productApi.createProduct(formData);
      toast.success('Product created successfully', { id: t });
    }

    closeModal();
    fetchData();
  } catch (error: any) {
    console.error("Submission Error:", error);
    toast.error(error.response?.data?.message || 'Failed to save product', { id: t });
  }
};

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) return toast.error("Name is required");
    
    try {
      if (editingCategory) {
        setCategories(prev => prev ? prev.map(c => 
          c.id === editingCategory.id 
            ? { ...c, name: categoryForm.name, description: categoryForm.description }
            : c
        ) : []);
        toast.success(`Category '${categoryForm.name}' updated (locally)`);
      } else {
        const newCat = await categoryApi.createCategory(categoryForm.name, categoryForm.description);
        setCategories(prev => prev ? [...prev, newCat] : [newCat]);
        toast.success(`Category '${newCat.name}' created`);
      }
      closeModal();
    } catch (error: any) {
      console.error('Category API Error:', error);
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleSubCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subCatForm.parentCategoryId || !subCatForm.name) return toast.error("All fields required");
    
    try {
      const parentId = Number(subCatForm.parentCategoryId);
      
      if (editingSubCategory) {
        setCategories(prev => prev ? prev.map(c => 
          c.id === parentId 
            ? { 
                ...c, 
                subCategories: (c.subCategories || []).map(sc => 
                  sc.id === editingSubCategory.id 
                    ? { ...sc, name: subCatForm.name, description: subCatForm.description }
                    : sc
                ) 
              } 
            : c
        ) : []);
        toast.success(`Subcategory '${subCatForm.name}' updated (locally)`);
      } else {
        const newSub = await categoryApi.createSubCategory(parentId, subCatForm.name, subCatForm.description);
        const updatedCats = categories ? categories.map(c => 
          c.id === parentId 
            ? { ...c, subCategories: [...(c.subCategories || []), newSub] } 
            : c
        ) : [];
        setCategories(updatedCats);
        toast.success(`Subcategory '${newSub.name}' added`);
      }
      closeModal();
    } catch (error: any) {
      console.error('Subcategory API Error:', error);
      toast.error(error.response?.data?.message || 'Failed to save subcategory');
    }
  };

  // --- DELETE HANDLERS ---
  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productApi.deleteProduct(id);
      toast.success('Product deleted');
      fetchData();
    } catch (error) { 
      console.error('Delete product error:', error);
      toast.error('Failed to delete product'); 
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Delete this category? This will also delete all subcategories.')) return;
    try {
      setCategories(prev => prev ? prev.filter(c => c.id !== id) : []);
      toast.success('Category deleted (locally)');
    } catch (error) { 
      console.error('Delete category error:', error);
      toast.error('Failed to delete category'); 
    }
  };

  const handleDeleteSubCategory = async (id: number) => {
    if (!confirm('Delete this subcategory?')) return;
    try {
      setCategories(prev => prev ? prev.map(c => ({
        ...c,
        subCategories: (c.subCategories || []).filter(sc => sc.id !== id)
      })) : []);
      toast.success('Subcategory deleted (locally)');
    } catch (error) { 
      console.error('Delete subcategory error:', error);
      toast.error('Failed to delete subcategory'); 
    }
  };

  // --- TOGGLE STATUS ---
  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await productApi.deactivateProduct(id);
        toast.success('Product Deactivated ⏸');
      } else {
        await productApi.activateProduct(id);
        toast.success('Product Activated ▶');
      }
      fetchData();
    } catch (error) {
      console.error('Toggle status error:', error);
      toast.error('Failed to update status');
    }
  };

  // --- INPUT HANDLERS ---
  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setProductForm(prev => ({ ...prev, category: value, subcategory: '' }));
    } else {
      setProductForm(prev => ({
        ...prev,
        [name]: ['price', 'salePrice', 'stock'].includes(name) ? Number(value) : value,
      }));
    }
  };

  // --- COLUMN FILTER HANDLER ---
  const handleColumnFilterChange = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }));
    setPage(1);
  };

  // --- ROWS PER PAGE OPTIONS ---
  const rowsPerPageOptions = [5, 10, 20, 50, 100];

  return (
    <div className="h-full flex flex-col">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-dark-900">
            Product Management
          </h2>
          <p className="text-dark-600 mt-1">
            {activeTab === 'PRODUCT' && `${filteredProducts?.length || 0} products total`}
            {activeTab === 'CATEGORY' && `${filteredCategories?.length || 0} categories total`}
            {activeTab === 'SUBCATEGORY' && `${filteredSubCategories?.length || 0} subcategories total`}
          </p>
        </div>
        
        {/* ACTION BUTTONS - LIKE 2ND IMAGE */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openCategoryModal()}
            className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-white border border-gray-300 text-dark-800 hover:bg-gray-50 transition-colors"
          >
            <FiFolder size={18} />
            <span>Add Category</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openSubCategoryModal()}
            className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-white border border-gray-300 text-dark-800 hover:bg-gray-50 transition-colors"
          >
            <FiGrid size={18} />
            <span>Add Subcategory</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openProductEditModal()}
            className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-[#8FAE8B] text-white hover:bg-[#7E9F7A] transition-colors"
          >
            <FiPlus size={18} />
            <span>Add Product</span>
          </motion.button>
        </div>
      </div>

      {/* --- TAB NAVIGATION --- */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-6 py-3 font-medium text-sm ${activeTab === 'PRODUCT' ? 'border-b-2 border-[#8FAE8B] text-[#8FAE8B]' : 'text-dark-600 hover:text-dark-900'}`}
          onClick={() => setActiveTab('PRODUCT')}
        >
          Products
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm ${activeTab === 'CATEGORY' ? 'border-b-2 border-[#8FAE8B] text-[#8FAE8B]' : 'text-dark-600 hover:text-dark-900'}`}
          onClick={() => setActiveTab('CATEGORY')}
        >
          Categories
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm ${activeTab === 'SUBCATEGORY' ? 'border-b-2 border-[#8FAE8B] text-[#8FAE8B]' : 'text-dark-600 hover:text-dark-900'}`}
          onClick={() => setActiveTab('SUBCATEGORY')}
        >
          Subcategories
        </button>
      </div>

      {/* --- SEARCH BAR (LIKE REFERENCE IMAGE) --- */}
      {(activeTab === 'CATEGORY' || activeTab === 'SUBCATEGORY') && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <FiSearch className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'CATEGORY' ? 'categories' : 'subcategories'}...`}
              className="flex-1 bg-transparent border-none focus:outline-none text-dark-900 placeholder-gray-500"
              value={columnFilters.item}
              onChange={(e) => handleColumnFilterChange('item', e.target.value)}
            />
            {columnFilters.item && (
              <button
                onClick={() => handleColumnFilterChange('item', '')}
                className="text-gray-500 hover:text-dark-700"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT WITH SCROLLABLE TABLE --- */}
      <div className="flex-1 flex flex-col min-h-0">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-8">Loading...</div>
          </div>
        ) : (
          <>
            {/* CATEGORY TABLE */}
            {activeTab === 'CATEGORY' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="bg-white rounded-lg shadow overflow-hidden flex-1 flex flex-col">
                  <div className="overflow-x-auto flex-1">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">Sr. No.</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[200px]">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedCategories && paginatedCategories.length > 0 ? (
                          paginatedCategories.map((category, index) => (
                            <tr key={category.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {(page - 1) * rowsPerPage + index + 1}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {category.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                <div className="max-w-md break-words">
                                  {category.description || '-'}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => openCategoryModal(category)}
                                    className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                                    title="Edit"
                                  >
                                    <FiEdit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                                    title="Delete"
                                  >
                                    <FiTrash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                              No categories found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUBCATEGORY TABLE */}
            {activeTab === 'SUBCATEGORY' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="bg-white rounded-lg shadow overflow-hidden flex-1 flex flex-col">
                  <div className="overflow-x-auto flex-1">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">Sr. No.</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px]">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedSubCategories && paginatedSubCategories.length > 0 ? (
                          paginatedSubCategories.map((sub, index) => (
                            <tr key={sub.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {(page - 1) * rowsPerPage + index + 1}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {sub.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {sub.parentName}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                <div className="max-w-md break-words">
                                  {sub.description || '-'}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => openSubCategoryModal(sub)}
                                    className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                                    title="Edit"
                                  >
                                    <FiEdit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubCategory(sub.id)}
                                    className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                                    title="Delete"
                                  >
                                    <FiTrash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                              No subcategories found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCT TABLE WITH COLUMN FILTERS */}
            {activeTab === 'PRODUCT' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="bg-white rounded-lg shadow overflow-hidden flex-1 flex flex-col">
                  <div className="overflow-x-auto flex-1">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[200px] max-w-[300px]">
                            <div className="flex flex-col">
                              <span className="mb-1">Item</span>
                              <input
                                type="text"
                                placeholder="Search Item"
                                className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8FAE8B] focus:border-[#8FAE8B]"
                                value={columnFilters.item}
                                onChange={(e) => handleColumnFilterChange('item', e.target.value)}
                              />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px] max-w-[180px]">
                            <div className="flex flex-col">
                              <span className="mb-1">Subcategory</span>
                              <input
                                type="text"
                                placeholder="Search Subcategory"
                                className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8FAE8B] focus:border-[#8FAE8B]"
                                value={columnFilters.subcategory}
                                onChange={(e) => handleColumnFilterChange('subcategory', e.target.value)}
                              />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px] max-w-[180px]">
                            <div className="flex flex-col">
                              <span className="mb-1">Category</span>
                              <input
                                type="text"
                                placeholder="Search Category"
                                className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8FAE8B] focus:border-[#8FAE8B]"
                                value={columnFilters.category}
                                onChange={(e) => handleColumnFilterChange('category', e.target.value)}
                              />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                            <div className="flex flex-col">
                              <span className="mb-1">Stock</span>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                            <div className="flex flex-col">
                              <span className="mb-1">Price</span>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                            <div className="flex flex-col">
                              <span className="mb-1">Status</span>
                              <select
                                className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#8FAE8B] focus:border-[#8FAE8B] bg-white"
                                value={columnFilters.status}
                                onChange={(e) => handleColumnFilterChange('status', e.target.value)}
                              >
                                <option value="">All</option>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                              </select>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedProducts && paginatedProducts.length > 0 ? (
                          paginatedProducts.map((product, index) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0 mr-3">
                                    <img
                                      src={getImageUrl(product.images?.[0])}
                                      alt={product.name}
                                      className="h-10 w-10 rounded object-cover border border-gray-200"
                                    />
                                  </div>
                                  <div className="text-sm font-medium text-gray-900 max-w-[250px]">
                                    <div className="break-words">{product.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 max-w-[150px]">
                                <div className="truncate">{product.subcategory}</div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 max-w-[150px]">
                                <div className="truncate">{product.category}</div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {product.stock}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                <div className="flex flex-col">
                                  <div className="font-semibold">₹{product.price.toFixed(2)}</div>
                                  {product.salePrice > 0 && (
                                    <div className="text-xs text-red-600 line-through">₹{product.salePrice.toFixed(2)}</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {product.isActive ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => openProductViewModal(product)}
                                    className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                                    title="View Details"
                                  >
                                    <FiEye size={16} />
                                  </button>
                                  <button
                                    onClick={() => openProductEditModal(product)}
                                    className="p-1.5 text-[#8FAE8B] hover:text-[#7E9F7A] hover:bg-[#8FAE8B]/10 rounded"
                                    title="Edit"
                                  >
                                    <FiEdit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleToggleStatus(product.id, product.isActive)}
                                    className={`p-1.5 rounded ${product.isActive ? "text-orange-600 hover:text-orange-900 hover:bg-orange-50" : "text-green-600 hover:text-green-900 hover:bg-green-50"}`}
                                    title={product.isActive ? "Deactivate" : "Activate"}
                                  >
                                    {product.isActive ? <FiPause size={16} /> : <FiPlay size={16} />}
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
                                    title="Delete"
                                  >
                                    <FiTrash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                              {loading ? 'Loading products...' : 'No products found'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* --- PAGINATION & ROWS PER PAGE --- */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Rows per page:</span>
                  <select
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#8FAE8B] focus:border-[#8FAE8B]"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    {rowsPerPageOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(page - 1) * rowsPerPage + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(
                        page * rowsPerPage,
                        activeTab === 'CATEGORY' ? (filteredCategories?.length || 0) :
                        activeTab === 'SUBCATEGORY' ? (filteredSubCategories?.length || 0) :
                        (filteredProducts?.length || 0)
                      )}
                    </span>{' '}
                    of{' '}
                    <span className="font-medium">
                      {activeTab === 'CATEGORY' ? (filteredCategories?.length || 0) :
                       activeTab === 'SUBCATEGORY' ? (filteredSubCategories?.length || 0) :
                       (filteredProducts?.length || 0)}
                    </span>{' '}
                    results
                  </p>
                </div>
              </div>
              
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === i + 1
                          ? 'z-10 bg-[#8FAE8B]/10 border-[#8FAE8B] text-[#8FAE8B]'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={page === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activeModal !== 'NONE' && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="backdrop-overlay" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-xl p-6 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar border border-gray-200">
                
                {/* PRODUCT VIEW MODAL */}
                {activeModal === 'PRODUCT_VIEW' && viewingProduct && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                      <button type="button" onClick={closeModal}><FiX size={24} className="text-gray-400 hover:text-gray-900" /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Product Information</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="label">Product Name</label>
                            <div className="input-field bg-gray-50 break-words">{viewingProduct.name}</div>
                          </div>
                          <div>
                            <label className="label">Description</label>
                            <div className="input-field bg-gray-50 min-h-[100px] break-words whitespace-pre-wrap">{viewingProduct.description}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="label">Category</label>
                              <div className="input-field bg-gray-50 break-words">{viewingProduct.category}</div>
                            </div>
                            <div>
                              <label className="label">Subcategory</label>
                              <div className="input-field bg-gray-50 break-words">{viewingProduct.subcategory}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Pricing & Stock</h3>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="label">Price</label>
                              <div className="input-field bg-gray-50">₹{viewingProduct.price.toFixed(2)}</div>
                            </div>
                            <div>
                              <label className="label">Sale Price</label>
                              <div className="input-field bg-gray-50 break-words">
                                {viewingProduct.salePrice > 0 ? `₹${viewingProduct.salePrice.toFixed(2)}` : 'Not on sale'}
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="label">Stock</label>
                            <div className="input-field bg-gray-50">{viewingProduct.stock}</div>
                          </div>
                          <div>
                            <label className="label">Status</label>
                            <div className={`px-3 py-2 rounded-lg break-words ${viewingProduct.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {viewingProduct.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </div>
                          </div>
                        </div>

                        {viewingProduct.attributes && viewingProduct.attributes.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Attributes</h3>
                            <div className="space-y-2">
                              {viewingProduct.attributes.map((attr: any, index: number) => (
                                <div key={index} className="flex justify-between">
                                  <span className="text-gray-700 break-words">{attr.type}:</span>
                                  <span className="font-medium break-words">{attr.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {viewingProduct.images && viewingProduct.images.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Product Images</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {viewingProduct.images.map((img, index) => (
                            <div key={index} className="relative aspect-square">
                              <img 
                                src={getImageUrl(img)} 
                                alt={`Product ${index + 1}`} 
                                className="w-full h-full object-cover rounded-lg border border-[#8FAE8B]/50"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-6">
                      <button
                        onClick={() => {
                          closeModal();
                          openProductEditModal(viewingProduct);
                        }}
                        className="btn-primary flex-1"
                      >
                        Edit Product
                      </button>
                      <button onClick={closeModal} className="btn-ghost flex-1">Close</button>
                    </div>
                  </div>
                )}

                {/* PRODUCT EDIT/CREATE MODAL */}
                {activeModal === 'PRODUCT' && (
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <button type="button" onClick={closeModal}><FiX size={24} className="text-gray-400 hover:text-gray-900" /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Product Name *</label>
                          <input type="text" name="name" value={productForm.name} onChange={handleProductInputChange} className="input-field" required />
                        </div>
                        <div>
                            <label className="label">Category *</label>
                            <select name="category" value={productForm.category} onChange={handleProductInputChange} className="input-field" required>
                                <option value="">Select Category</option>
                                {categories && categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Subcategory *</label>
                            <select name="subcategory" value={productForm.subcategory} onChange={handleProductInputChange} className="input-field" required disabled={!productForm.category}>
                                <option value="">Select Subcategory</option>
                                {availableSubCategories?.map(sub => <option key={sub.id} value={sub.name}>{sub.name}</option>) || []}
                            </select>
                        </div>
                        <div>
                          <label className="label">Stock *</label>
                          <input type="number" name="stock" value={productForm.stock} onChange={handleProductInputChange} className="input-field" required min="0"/>
                        </div>
                        <div>
                          <label className="label">Sizes</label>
                          <input
                            type="text"
                            value={sizesInput}
                            onChange={(e) => setSizesInput(e.target.value)}
                            placeholder="S, M, L, XL (comma separated)"
                            className="input-field"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Enter sizes separated by commas (e.g., S, M, L, XL)
                          </p>
                        </div>
                        <div>
                          <label className="label">Colours</label>
                          <input
                            type="text"
                            value={colorsInput}
                            onChange={(e) => setColorsInput(e.target.value)}
                            placeholder="Red, Black, Blue (comma separated)"
                            className="input-field"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Enter colours separated by commas (e.g., Red, Black, Blue)
                          </p>
                        </div>
                        <div>
                          <label className="label">Price *</label>
                          <input type="number" name="price" value={productForm.price} onChange={handleProductInputChange} className="input-field" required min="0" step="0.01"/>
                        </div>
                        <div>
                          <label className="label">Sale Price</label>
                          <input type="number" name="salePrice" value={productForm.salePrice} onChange={handleProductInputChange} className="input-field" min="0" step="0.01"/>
                        </div>
                    </div>
                    <div>
                      <label className="label">Description *</label>
                      <textarea name="description" value={productForm.description} onChange={handleProductInputChange} className="input-field min-h-[100px]" required />
                    </div>
                    
                    <div>
                        <label className="label">Images</label>
                        <div className="flex items-center justify-center w-full mb-4">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FiImage className="w-8 h-8 mb-2 text-gray-400" />
                                    <p className="text-sm text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                </div>
                                <input type="file" className="hidden" multiple onChange={handleFileChange} accept="image/*" />
                            </label>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {productForm.images.map((img, index) => (
                               <div key={`exist-${index}`} className="relative aspect-square">
                                  <img src={getImageUrl(img)} alt="Existing" className="w-full h-full object-cover rounded-lg border border-[#8FAE8B]/50" />
                                  <button type="button" onClick={() => setProductForm(prev => ({...prev, images: prev.images.filter((_, i) => i !== index)}))} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 text-white"><FiX size={12}/></button>
                               </div> 
                            ))}
                            {previewUrls.map((url, index) => (
                                <div key={`new-${index}`} className="relative aspect-square">
                                   <img src={url} alt="New Upload" className="w-full h-full object-cover rounded-lg opacity-80" />
                                   <button type="button" onClick={() => removeFile(index)} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 text-white"><FiX size={12}/></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                      <label className="label">Product Videos</label>
                      <div className="flex items-center justify-center w-full mb-4">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FiPlay className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-sm text-gray-400">
                              <span className="font-semibold">Click or drag videos</span>
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            accept="video/*"
                            onChange={handleVideoChange}
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {videoPreviewUrls.map((url, index) => (
                          <div key={index} className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
                            <video src={url} className="w-full h-full object-cover" muted />
                            <button type="button" onClick={() => removeVideo(index)} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 text-white">
                              <FiX size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="btn-primary flex-1">{editingProduct ? 'Update' : 'Create'}</button>
                        <button type="button" onClick={closeModal} className="btn-ghost flex-1">Cancel</button>
                    </div>
                  </form>
                )}

                {/* CATEGORY MODAL */}
                {activeModal === 'CATEGORY' && (
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {editingCategory ? 'Edit Category' : 'Add New Category'}
                      </h2>
                      <button type="button" onClick={closeModal}><FiX size={24} className="text-gray-400 hover:text-gray-900" /></button>
                    </div>
                    <div>
                      <label className="label">Category Name *</label>
                      <input type="text" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="input-field" required/>
                    </div>
                    <div>
                      <label className="label">Description</label>
                      <textarea value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} className="input-field"/>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button type="submit" className="btn-primary flex-1">{editingCategory ? 'Update' : 'Create'} Category</button>
                      <button type="button" onClick={closeModal} className="btn-ghost flex-1">Cancel</button>
                    </div>
                  </form>
                )}

                {/* SUBCATEGORY MODAL */}
                {activeModal === 'SUBCATEGORY' && (
                  <form onSubmit={handleSubCategorySubmit} className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {editingSubCategory ? 'Edit Subcategory' : 'Add New Subcategory'}
                      </h2>
                      <button type="button" onClick={closeModal}><FiX size={24} className="text-gray-400 hover:text-gray-900" /></button>
                    </div>
                    <div>
                      <label className="label">Parent Category *</label>
                      <select value={subCatForm.parentCategoryId} onChange={e => setSubCatForm({...subCatForm, parentCategoryId: e.target.value})} className="input-field" required>
                        <option value="">Select Parent Category</option>
                        {categories && categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label">Subcategory Name *</label>
                      <input type="text" value={subCatForm.name} onChange={e => setSubCatForm({...subCatForm, name: e.target.value})} className="input-field" required/>
                    </div>
                    <div>
                      <label className="label">Description</label>
                      <textarea value={subCatForm.description} onChange={e => setSubCatForm({...subCatForm, description: e.target.value})} className="input-field"/>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button type="submit" className="btn-primary flex-1">{editingSubCategory ? 'Update' : 'Create'} Subcategory</button>
                      <button type="button" onClick={closeModal} className="btn-ghost flex-1">Cancel</button>
                    </div>
                  </form>
                )}

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      
      <style>{`
        .label { 
          @apply text-sm font-semibold text-gray-700 mb-2 block; 
        }
        .input-field {
          @apply w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAE8B] focus:border-[#8FAE8B] outline-none transition-colors;
        }
        .btn-primary {
          @apply px-6 py-2 bg-[#8FAE8B] text-white font-semibold rounded-lg hover:bg-[#7E9F7A] transition-colors;
        }
        .btn-ghost {
          @apply px-6 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors;
        }
        .backdrop-overlay {
          @apply fixed inset-0 bg-black/50 z-40;
        }
      `}</style>
    </div>
  );
};

export default AdminProducts;