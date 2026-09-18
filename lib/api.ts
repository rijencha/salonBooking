import type { Service, Appointment, AppointmentStatus } from "@/types";

const BASE_URL = "http://127.0.0.1:8000/api";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || JSON.stringify(errData) || "Request failed");
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getServices: (): Promise<Service[]> => fetch(`${BASE_URL}/services`).then(handleResponse),
  createService: (data: Omit<Service, "id">): Promise<Service> =>
    fetch(`${BASE_URL}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateService: (id: number, data: Omit<Service, "id">): Promise<Service> =>
    fetch(`${BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),
  deleteService: (id: number) =>
    fetch(`${BASE_URL}/services/${id}`, { method: "DELETE" }).then(handleResponse),

  getAppointments: (status?: string): Promise<Appointment[]> =>
    fetch(`${BASE_URL}/appointments${status ? `?status=${status}` : ""}`).then(handleResponse),
  createAppointment: (data: Omit<Appointment, "id" | "service_name" | "status">): Promise<Appointment> =>
    fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateAppointmentStatus: (id: number, status: AppointmentStatus): Promise<Appointment> =>
    fetch(`${BASE_URL}/appointments/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(handleResponse),
  deleteAppointment: (id: number) =>
    fetch(`${BASE_URL}/appointments/${id}`, { method: "DELETE" }).then(handleResponse),
};