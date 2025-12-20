import axiosInstance from './axios';
import type {
  Order,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  OrderStatistics,
  PaginatedResponse,
} from '../types';

export const orderApi = {
  // Create order
  createOrder: async (orderData: CreateOrderRequest): Promise<Order> => {
    const response = await axiosInstance.post<Order>('/orders', orderData);
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id: number): Promise<Order> => {
    const response = await axiosInstance.get<Order>(`/orders/${id}`);
    return response.data;
  },

  // Get user orders with pagination
  getUserOrders: async (userId: number, page = 0, pageSize = 10): Promise<PaginatedResponse<Order>> => {
    const response = await axiosInstance.get<PaginatedResponse<Order>>(`/orders/user/${userId}`, {
      params: { page, pageSize },
    });
    return response.data;
  },

  // Get all orders (Admin only)
  getAllOrders: async (page = 0, pageSize = 10): Promise<PaginatedResponse<Order>> => {
    const response = await axiosInstance.get<PaginatedResponse<Order>>('/orders', {
      params: { page, pageSize },
    });
    return response.data;
  },

  // Get orders by status (Admin only)
  getOrdersByStatus: async (status: string): Promise<Order[]> => {
    const response = await axiosInstance.get<Order[]>(`/orders/status/${status}`);
    return response.data;
  },

  // Track order by tracking number
  trackOrder: async (trackingNumber: string): Promise<Order> => {
    const response = await axiosInstance.get<Order>(`/orders/track/${trackingNumber}`);
    return response.data;
  },

  // Update order status (Admin only)
  updateOrderStatus: async (id: number, statusData: UpdateOrderStatusRequest): Promise<Order> => {
    const response = await axiosInstance.put<Order>(`/orders/${id}/status`, statusData);
    return response.data;
  },

  // Get order statistics (Admin only)
  getOrderStatistics: async (): Promise<OrderStatistics> => {
    const response = await axiosInstance.get<OrderStatistics>('/orders/statistics');
    return response.data;
  },
};

export default orderApi;