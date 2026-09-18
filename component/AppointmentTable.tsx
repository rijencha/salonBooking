"use client";

import type { Appointment, AppointmentStatus } from "@/types";
import { api } from "@/lib/api";
import StatusBadge from "./StatusBadge";

const STATUSES: AppointmentStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled"];

export default function AppointmentTable({
  appointments, onChange,
}: { appointments: Appointment[]; onChange: () => void }) {
  const handleStatusChange = async (id: number, status: AppointmentStatus) => {
    await api.updateAppointmentStatus(id, status);
    onChange();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this appointment?")) return;
    await api.deleteAppointment(id);
    onChange();
  };

  return (
    <div className="card">
      {appointments.length === 0 && <p>No appointments found.</p>}
      <table>
        <thead>
          <tr><th>Customer</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.customer_name}</td>
              <td>{a.service_name}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>
                <StatusBadge status={a.status} />
                <select value={a.status} onChange={(e) => handleStatusChange(a.id, e.target.value as AppointmentStatus)} style={{ marginLeft: 8 }}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td><button className="danger" onClick={() => handleDelete(a.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}