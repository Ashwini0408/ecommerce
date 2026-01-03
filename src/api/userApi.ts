import axiosInstance from "./axios";
import type { PaginatedResponse } from "../types";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  orderCount: number;
  appointmentCount: number;
};

export const userApi = {
  getCustomers: async (
    page = 0,
    pageSize = 10
  ): Promise<PaginatedResponse<User>> => {
    const response = await axiosInstance.get<PaginatedResponse<User>>(
      "/users",
      {
        params: {
          role: "CUSTOMER",   // required
          page,
          pageSize,
        },
      }
    );
    return response.data;
  },
};

export default userApi;


