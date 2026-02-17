import axiosInstance from './axios';
import type {
  Order,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  OrderStatistics,
  PaginatedResponse,
} from '../types';

export interface InitiatePaymentResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
}

export interface VerifyPaymentRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface CalculateShippingRequest {
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    contactPhone: string;
  };
  subtotal: number;
}

export interface CalculateShippingResponse {
  shippingCharges: number;
}

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
updateOrderStatus: async (
  id: number,
  statusData: UpdateOrderStatusRequest
): Promise<Order> => {
  const response = await axiosInstance.patch<Order>(
    `/orders/${id}/status`,
    statusData
  );
  return response.data;
},
  // Fetch order timeline (User / Admin)
getOrderTimeline: async (id: number): Promise<
  {
    status: string;
    message: string;
    timestamp: string;
  }[]
> => {
  const response = await axiosInstance.get<
    {
      status: string;
      message: string;
      timestamp: string;
    }[]
  >(`/orders/${id}/timeline`);
  return response.data;
},

  // Initiate Razorpay payment for an order
  initiatePayment: async (orderId: number): Promise<InitiatePaymentResponse> => {
    const response = await axiosInstance.post<InitiatePaymentResponse>(
      `/orders/${orderId}/pay`
    );
    return response.data;
  },

  // Calculate shipping charges based on address and subtotal
  calculateShipping: async (payload: CalculateShippingRequest): Promise<CalculateShippingResponse> => {
    const response = await axiosInstance.post<CalculateShippingResponse>(
      '/orders/calculate-shipping',
      payload
    );
    return response.data;
  },

  verifyPayment: async (orderId: number, payload: VerifyPaymentRequest): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>(
      `/orders/${orderId}/verify-payment`,
      payload
    );
    return response.data;
  },

  // Download invoice for an order
  downloadInvoice: async (orderId: number): Promise<Blob> => {
    const response = await axiosInstance.get<Blob>(`/invoices/order/${orderId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Get order statistics (Admin only)
  getOrderStatistics: async (): Promise<OrderStatistics> => {
    const response = await axiosInstance.get<OrderStatistics>('/orders/statistics');
    return response.data;
  },
};

export default orderApi;
