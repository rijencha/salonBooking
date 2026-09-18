"use client";

import type { Service } from "@/types";
import { api } from "@/lib/api";
import { Scissors, Pencil } from "lucide-react";

interface ServicetableProps {
  services: Service[];
  onChange: () => void;
  onEdit: (service: Service) => void;
}

export default function Servicetable({ services, onChange, onEdit }: ServicetableProps) {
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    await api.deleteService(id);
    onChange();
  };

  return (
    <div className="card !p-5 overflow-hidden">
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="!mb-0 text-base font-semibold text-gray-900">All Services</h3>
      </div>

      {services.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-8 py-12 text-center">
          <Scissors size={32} className="text-gray-400" />
          <p className="text-sm font-medium text-gray-500">No services yet</p>
          <p className="text-xs text-gray-400">Add your first service using the form</p>
        </div>
      ) : (
        <table className="!mt-0">
          <thead>
            <tr>
              <th className="pl-6">Name</th>
              <th>Price (NPR)</th>
              <th>Duration</th>
              <th className="pr-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td className="pl-6 font-medium text-gray-900">{s.name}</td>
                <td>NPR {s.price.toLocaleString()}</td>
                <td>{s.duration} min</td>
                <td className="pr-6">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(s)}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button className="danger" onClick={() => handleDelete(s.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}