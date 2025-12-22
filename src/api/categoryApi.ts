import axiosInstance from './axios';

export interface SubCategory {
  id: number;
  name: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  subCategories: SubCategory[];
}

export const categoryApi = {
  // Get all categories (and their subcategories)
  getAllCategories: async (): Promise<Category[]> => {
    const response = await axiosInstance.get<Category[]>('/categories');
    return response.data;
  },

  // Create a new Category
  createCategory: async (name: string, description: string): Promise<Category> => {
    const response = await axiosInstance.post<Category>('/categories', { name, description });
    return response.data;
  },

  // Create a new Subcategory under a Category
  createSubCategory: async (categoryId: number, name: string, description: string): Promise<SubCategory> => {
    const response = await axiosInstance.post<SubCategory>(`/categories/${categoryId}/subcategories`, { 
      name, 
      description 
    });
    return response.data;
  }
};