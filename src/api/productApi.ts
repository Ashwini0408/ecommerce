import axiosInstance from './axios';
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductFilterRequest,
  PaginatedResponse,
} from '../types';

export const productApi = {
  // Get all products with pagination
  getAllProducts: async (page = 0, pageSize = 12): Promise<PaginatedResponse<Product>> => {
    const response = await axiosInstance.get<PaginatedResponse<Product>>('/products', {
      params: { page, pageSize },
    });
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Search products with filters
  searchProducts: async (filters: ProductFilterRequest): Promise<PaginatedResponse<Product>> => {
    const response = await axiosInstance.post<PaginatedResponse<Product>>('/products/search', filters);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>(`/products/category/${category}`);
    return response.data;
  },

  // Get products by subcategory
  getProductsBySubcategory: async (subcategory: string): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>(`/products/subcategory/${subcategory}`);
    return response.data;
  },

  // Create product (Admin only)
  createProduct: async (formData: FormData): Promise<Product> => {
    // Note: We don't manually set Content-Type here; Axios sets 'multipart/form-data' automatically when it sees FormData
    const response = await axiosInstance.post<Product>('/products', formData);
    return response.data;
  },

  // Update product (Admin only)
  updateProduct: async (id: number, productData: UpdateProductRequest): Promise<Product> => {
    const response = await axiosInstance.put<Product>(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (Admin only)
  deleteProduct: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`);
  },

  // Deactivate product (Admin only)
  deactivateProduct: async (id: number): Promise<void> => {
    await axiosInstance.patch(`/products/${id}/deactivate`);
  },

  // Add this new method
  activateProduct: async (id: number): Promise<void> => {
    await axiosInstance.patch(`/products/${id}/activate`);
  },
};

export default productApi