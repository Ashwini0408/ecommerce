import axiosInstance from "./axios";

export const cartApi = {
  addToCart: async (payload: {
    productId: number;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
  }) => {
    const response = await axiosInstance.post("/cart/item", payload);
    return response.data;
  },
};

export default cartApi;