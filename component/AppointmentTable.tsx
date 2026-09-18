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
    <div className="card !p-5 overflow-hidden">
      {appointments.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-8 py-12 text-center">
          <p className="text-sm font-medium text-gray-500">No appointments found</p>
          <p className="text-xs text-gray-400">Book one to see it listed here</p>
        </div>
      ) : (
        <table className="!mt-0">
          <thead>
            <tr>
              <th className="pl-6">Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th className="pr-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="pl-6 font-medium text-gray-900">{a.customer_name}</td>
                <td>{a.service_name}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={a.status} />
                    <select
                      value={a.status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value as AppointmentStatus)}
                      className="!mb-0 !w-auto rounded-md border border-gray-200 py-1 text-xs text-gray-500"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="pr-6 text-right">
                  <button className="danger" onClick={() => handleDelete(a.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}