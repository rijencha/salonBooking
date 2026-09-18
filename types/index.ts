export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface Appointment {
  id: number;
  customer_name: string;
  customer_phone: string;
  service: number;
  service_name: string;
  date: string;
  time: string;
  notes?: string;
  status: AppointmentStatus;
}