"use client";

import type { Service } from "@/types";
import { api } from "@/lib/api";

export default function Servicetable({ services, onChange }: { services: Service[]; onChange: () => void }) {
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    await api.deleteService(id);
    onChange();
  };

  return (
    <div className="card">
      <h3>Services</h3>
      {services.length === 0 && <p>No services yet.</p>}
      <table>
        <thead>
          <tr><th>Name</th><th>Price (NPR)</th><th>Duration (min)</th><th>Action</th></tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.price}</td>
              <td>{s.duration}</td>
              <td><button className="danger" onClick={() => handleDelete(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}