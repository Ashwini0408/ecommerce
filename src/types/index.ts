// ==================== USER & AUTH ====================
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'CUSTOMER';
  isActive: boolean;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  name: string;
  role: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// ==================== PRODUCT ====================
export interface ProductAttribute {
  type: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  category: string;
  subcategory: string;
  images: string[];
  videos?: string[];
  attributes: ProductAttribute[];
  isActive: boolean;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  category: string;
  subcategory: string;
  images: string[];
  videos?: string[];
  attributes?: ProductAttribute[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  isActive?: boolean;
}

export interface ProductFilterRequest {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  filter(arg0: (u: { id: number; name: string; email: string; role: string; status: string; phone?: string; address?: string; createdAt: string; }) => boolean): PaginatedResponse<import("../api/userApi").UserResponse>;
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// ==================== CART ====================
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  image: string;
  stock: number;
}

// ==================== ORDER ====================
export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: number;
  userId: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  totalAmount: number;
  discount?: number;
  tax?: number;
  trackingNumber?: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  items: {
    productId: number;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
  }[];
  shippingAddress: string;
}

export interface UpdateOrderStatusRequest {
  status: string;
  trackingNumber?: string;
}

export interface OrderStatistics {
  totalOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
}

// ==================== APPOINTMENT ====================
export interface Appointment {
  id: number;
  userId: number;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: 'STYLING_CONSULTATION' | 'PERSONAL_SHOPPING' | 'ALTERATIONS' | 'VIRTUAL_CONSULTATION' | 'IN_STORE_VISIT';
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  createdAt: string;
}

export interface CreateAppointmentRequest {
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  status?: string;
  notes?: string;
}

export interface AppointmentStatistics {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
}

// ==================== ADDRESS ====================
export interface Address {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// ==================== API ERROR ====================
export interface ApiError {
  timestamp: string;
  status: number;
  message: string;
  path: string;
  validationErrors?: Record<string, string>;
}