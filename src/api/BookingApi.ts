import axiosInstance from "./axios";

export interface CreateAppointmentRequest {
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  notes?: string;
}

export interface AppointmentResponse {
  id: number;
  userId: number;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  notes: string;
  status: string;
  createdAt: string;
}

export const BookingApi = {
  // CUSTOMER - Create Appointment
  createAppointment: async (
    payload: CreateAppointmentRequest
  ): Promise<AppointmentResponse> => {
    const response = await axiosInstance.post("/appointments", payload);
    return response.data;
  },

  // ADMIN - Get Appointments By Date
  getAppointmentsByDate: async (
    date: string
  ): Promise<AppointmentResponse[]> => {
    const response = await axiosInstance.get(`/appointments/date/${date}`);
    return response.data;
  },
};

export default BookingApi;
