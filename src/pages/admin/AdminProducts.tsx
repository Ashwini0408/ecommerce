import { useState, useEffect } from 'react';
// Add FiPause and FiPlay to your imports
// import { FiPlus, FiEdit2, FiTrash2, FiX, FiImage, FiFolder, FiGrid} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiImage, FiFolder, FiGrid, FiPause, FiPlay } from 'react-icons/fi';
import { productApi } from '../../api/productApi';
import { categoryApi, type Category } from '../../api/categoryApi';
import type { Product, CreateProductRequest } from '../../types';
import toast from 'react-hot-toast';

// --- CONFIGURATION ---
// This points to your Spring Boot Server
const SERVER_URL = 'http://192.168.1.111:8090';

// Define the modes for our modal system
type ModalType = 'NONE' | 'PRODUCT' | 'CATEGORY' | 'SUBCATEGORY';

const AdminProducts = () => {
  // --- DATA STATE ---
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  //File Handling
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // --- MODAL STATE ---
  const [activeModal, setActiveModal] = useState<ModalType>('NONE');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- FORMS STATE ---
  const [productForm, setProductForm] = useState<CreateProductRequest>({
    name: '', description: '', price: 0, salePrice: 0, stock: 0,
    category: '', subcategory: '', images: [], videos: [], attributes: [],
  });

  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [subCatForm, setSubCatForm] = useState({ parentCategoryId: '', name: '', description: '' });

  // --- HELPER: RESOLVE IMAGE URL ---
  // This logic ensures we load images from the correct server
  const getImageUrl = (path?: string) => {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http') || path.startsWith('blob:')) return path; // Already absolute or local blob
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
        productApi.getAllProducts(0, 50),
        categoryApi.getAllCategories()
      ]);
      setProducts(prodRes.content);
      setCategories(catRes);
    } catch (error: any) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // --- MODAL OPENERS ---
  const openProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
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
      setProductForm({
        name: '', description: '', price: 0, salePrice: 0, stock: 0,
        category: '', subcategory: '', images: [], videos: [], attributes: [],
      });
    }
    setActiveModal('PRODUCT');
  };

  const openCategoryModal = () => {
    setCategoryForm({ name: '', description: '' });
    setActiveModal('CATEGORY');
  };

  const openSubCategoryModal = () => {
    setSubCatForm({ parentCategoryId: '', name: '', description: '' });
    setActiveModal('SUBCATEGORY');
  };

  const closeModal = () => {
    setActiveModal('NONE');
    setEditingProduct(null);
    setSelectedFiles([]);
    setPreviewUrls([]);
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

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // --- FORM SUBMIT: PRODUCT ---
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // 1. JSON Part
      const productBlob = new Blob([JSON.stringify(productForm)], { type: 'application/json' });
      formData.append('product', productBlob);

      // 2. File Part
      selectedFiles.forEach((file) => {
        formData.append('imageFiles', file);
      });

      if (editingProduct) {
        // NOTE: Update logic needs backend support for Multipart PUT. 
        // For now, we just update text data if no files selected, 
        // or you need to update backend PUT endpoint similarly to POST.
        await productApi.updateProduct(editingProduct.id, productForm);
        toast.success('Product updated');
      } else {
        await productApi.createProduct(formData);
        toast.success('Product created with images!');
      }

      closeModal();
      fetchData();
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error('Failed to create product.');
    }
  };

  // --- FORM SUBMIT: CATEGORY ---
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) return toast.error("Name is required");
    try {
      const newCat = await categoryApi.createCategory(categoryForm.name, categoryForm.description);
      setCategories([...categories, newCat]);
      toast.success(`Category '${newCat.name}' created`);
      closeModal();
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  // --- FORM SUBMIT: SUBCATEGORY ---
  const handleSubCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subCatForm.parentCategoryId || !subCatForm.name) return toast.error("All fields required");
    try {
      const parentId = Number(subCatForm.parentCategoryId);
      const newSub = await categoryApi.createSubCategory(parentId, subCatForm.name, subCatForm.description);
      
      const updatedCats = categories.map(c => 
        c.id === parentId 
          ? { ...c, subCategories: [...c.subCategories, newSub] } 
          : c
      );
      setCategories(updatedCats);
      toast.success(`Subcategory '${newSub.name}' added`);
      closeModal();
    } catch (error) {
      toast.error("Failed to create subcategory");
    }
  };

  // --- HANDLERS ---
  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productApi.deleteProduct(id);
      toast.success('Deleted');
      fetchData();
    } catch (error) { toast.error('Failed'); }
  };

// --- HANDLER: TOGGLE STATUS ---
  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        // If currently Active -> Deactivate it
        await productApi.deactivateProduct(id);
        toast.success('Product Deactivated ⏸');
      } else {
        // If currently Inactive -> Activate it
        // Note: We need to ensure this API exists (see Step 3)
        await productApi.activateProduct(id);
        toast.success('Product Activated ▶');
      }
      fetchData(); // Refresh the grid to show the new state
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

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

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) setProductForm(prev => ({ ...prev, images: [...prev.images, url] }));
  };

  const removeImage = (index: number) => {
    setProductForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const availableSubCategories = categories.find(c => c.name === productForm.category)?.subCategories || [];

  return (
    <div className="space-y-6">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Product Management</h2>
          <p className="text-dark-400 mt-1">{products.length} products total</p>
        </div>
        <div className="flex space-x-3">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openCategoryModal} className="px-4 py-2 glass-card rounded-xl text-white hover:bg-white/10 flex items-center space-x-2">
            <FiFolder /><span>Add Category</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openSubCategoryModal} className="px-4 py-2 glass-card rounded-xl text-white hover:bg-white/10 flex items-center space-x-2">
            <FiGrid /><span>Add Subcategory</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openProductModal()} className="btn-primary flex items-center space-x-2">
            <FiPlus /><span>Add Product</span>
          </motion.button>
        </div>
      </div>

      {/* --- GRID --- */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{/* Shimmers */}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div key={product.id} whileHover={{ y: -4 }} className="glass-card-hover rounded-2xl overflow-hidden">
              <div className="aspect-square bg-dark-900 relative">
                {/* ✅ FIX 1: Use getImageUrl for the Main Grid Image */}
                <img 
                  src={getImageUrl(product.images[0])} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target as HTMLImageElement).src = '/placeholder.jpg'}
                />
                {!product.isActive && (
                  <div className="absolute inset-0 bg-dark-950/80 flex items-center justify-center">
                    <span className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg">Inactive</span>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-white line-clamp-1">{product.name}</h3>
                <div className="flex space-x-2 text-xs text-dark-400">
                    <span className="px-2 py-0.5 bg-dark-800 rounded">{product.category}</span>
                    <span className="px-2 py-0.5 bg-dark-800 rounded">{product.subcategory}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold gradient-text">${product.price.toFixed(2)}</p>
                  <span className="px-3 py-1 bg-dark-800 text-dark-300 text-sm rounded-lg">Stock: {product.stock}</span>
                </div>
<div className="flex items-center space-x-2 pt-2 border-t border-white/10">
  
  {/* Edit Button */}
  <button onClick={() => openProductModal(product)} className="flex-1 p-2 hover:bg-white/10 rounded transition-colors" title="Edit">
    <FiEdit2 className="mx-auto text-primary-400" />
  </button>

  {/* ✅ THE NEW TOGGLE BUTTON */}
  <button 
    onClick={() => handleToggleStatus(product.id, product.isActive)} 
    className={`flex-1 p-2 rounded transition-colors group/status ${
      product.isActive 
        ? "hover:bg-orange-500/10" // Hover effect for Active
        : "hover:bg-green-500/10"  // Hover effect for Inactive
    }`}
    title={product.isActive ? "Deactivate Product" : "Activate Product"}
  >
    {product.isActive ? (
      // If Active: Show Pause Icon (Orange)
      <FiPause className="mx-auto text-orange-400 group-hover/status:text-orange-300" />
    ) : (
      // If Inactive: Show Play Icon (Green)
      <FiPlay className="mx-auto text-green-400 group-hover/status:text-green-300" />
    )}
  </button>

  {/* Delete Button */}
  <button onClick={() => handleDelete(product.id)} className="flex-1 p-2 hover:bg-white/10 rounded transition-colors" title="Delete">
    <FiTrash2 className="mx-auto text-red-400" />
  </button>

</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activeModal !== 'NONE' && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="backdrop-overlay" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
                
                {/* MODAL 1: PRODUCT */}
                {activeModal === 'PRODUCT' && (
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <button type="button" onClick={closeModal}><FiX size={24} className="text-dark-400 hover:text-white" /></button>
                    </div>

                    {/* Inputs... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="label">Product Name *</label><input type="text" name="name" value={productForm.name} onChange={handleProductInputChange} className="input-field" required /></div>
                        <div>
                            <label className="label">Category *</label>
                            <select name="category" value={productForm.category} onChange={handleProductInputChange} className="input-field bg-dark-900" required>
                                <option value="">Select Category</option>
                                {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Subcategory *</label>
                            <select name="subcategory" value={productForm.subcategory} onChange={handleProductInputChange} className="input-field bg-dark-900" required disabled={!productForm.category}>
                                <option value="">Select Subcategory</option>
                                {availableSubCategories.map(sub => <option key={sub.id} value={sub.name}>{sub.name}</option>)}
                            </select>
                        </div>
                        <div><label className="label">Stock *</label><input type="number" name="stock" value={productForm.stock} onChange={handleProductInputChange} className="input-field" required min="0"/></div>
                        <div><label className="label">Price *</label><input type="number" name="price" value={productForm.price} onChange={handleProductInputChange} className="input-field" required min="0" step="0.01"/></div>
                        <div><label className="label">Sale Price</label><input type="number" name="salePrice" value={productForm.salePrice} onChange={handleProductInputChange} className="input-field" min="0" step="0.01"/></div>
                    </div>
                    <div><label className="label">Description *</label><textarea name="description" value={productForm.description} onChange={handleProductInputChange} className="input-field min-h-[100px]" required /></div>
                    
                    {/* IMAGES SECTION */}
                    <div>
                        <label className="label">Images</label>
                        <div className="flex items-center justify-center w-full mb-4">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dark-700 border-dashed rounded-lg cursor-pointer bg-dark-800 hover:bg-dark-700">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FiImage className="w-8 h-8 mb-2 text-dark-400" />
                                    <p className="text-sm text-dark-400"><span className="font-semibold">Click to upload</span></p>
                                </div>
                                <input type="file" className="hidden" multiple onChange={handleFileChange} accept="image/*" />
                            </label>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {/* ✅ FIX 2: Use getImageUrl for Existing Images in Modal */}
                            {productForm.images.map((img, index) => (
                               <div key={`exist-${index}`} className="relative aspect-square">
                                  <img src={getImageUrl(img)} alt="Existing" className="w-full h-full object-cover rounded-lg border border-primary-500/50" />
                                  <button type="button" onClick={() => removeImage(index)} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 text-white"><FiX size={12}/></button>
                               </div> 
                            ))}
                            {/* New Previews (Blob URLs don't need getImageUrl) */}
                            {previewUrls.map((url, index) => (
                                <div key={`new-${index}`} className="relative aspect-square">
                                   <img src={url} alt="New Upload" className="w-full h-full object-cover rounded-lg opacity-80" />
                                   <button type="button" onClick={() => removeFile(index)} className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 text-white"><FiX size={12}/></button>
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

                {/* MODAL 2: CATEGORY */}
                {activeModal === 'CATEGORY' && (
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-white">Add New Category</h2><button type="button" onClick={closeModal}><FiX size={24} className="text-dark-400 hover:text-white" /></button></div>
                    <div><label className="label">Category Name *</label><input type="text" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="input-field" required/></div>
                    <div><label className="label">Description</label><textarea value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} className="input-field"/></div>
                    <div className="flex gap-3 pt-4"><button type="submit" className="btn-primary flex-1">Create Category</button><button type="button" onClick={closeModal} className="btn-ghost flex-1">Cancel</button></div>
                  </form>
                )}

                {/* MODAL 3: SUBCATEGORY */}
                {activeModal === 'SUBCATEGORY' && (
                  <form onSubmit={handleSubCategorySubmit} className="space-y-4">
                     <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-white">Add New Subcategory</h2><button type="button" onClick={closeModal}><FiX size={24} className="text-dark-400 hover:text-white" /></button></div>
                    <div>
                        <label className="label">Parent Category *</label>
                        <select value={subCatForm.parentCategoryId} onChange={e => setSubCatForm({...subCatForm, parentCategoryId: e.target.value})} className="input-field bg-dark-900" required>
                            <option value="">Select Parent Category</option>{categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div><label className="label">Subcategory Name *</label><input type="text" value={subCatForm.name} onChange={e => setSubCatForm({...subCatForm, name: e.target.value})} className="input-field" required/></div>
                    <div><label className="label">Description</label><textarea value={subCatForm.description} onChange={e => setSubCatForm({...subCatForm, description: e.target.value})} className="input-field"/></div>
                    <div className="flex gap-3 pt-4"><button type="submit" className="btn-primary flex-1">Create Subcategory</button><button type="button" onClick={closeModal} className="btn-ghost flex-1">Cancel</button></div>
                  </form>
                )}

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <style>{`.label { @apply text-sm font-semibold text-dark-300 mb-2 block; }`}</style>
    </div>
  );
};

export default AdminProducts;