"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Service } from "@/types";
import { useRouter } from "next/navigation";

export default function AppointmentForm() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState({
    customer_name: "", customer_phone: "", service: "", date: "", time: "", notes: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.customer_name.trim()) return setError("Customer name is required.");
    if (!form.customer_phone.trim()) return setError("Customer phone is required.");
    if (!form.service) return setError("Please select a service.");
    if (!form.date) return setError("Appointment date is required.");
    if (!form.time) return setError("Appointment time is required.");

    setLoading(true);
    try {
      await api.createAppointment({
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        service: Number(form.service),
        date: form.date,
        time: form.time,
        notes: form.notes,
      });
      router.push("/appointments");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Book Appointment</h3>
      {error && <p className="error">{error}</p>}
      <input placeholder="Customer name" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} />
      <input placeholder="Customer phone" value={form.customer_phone} onChange={(e) => setForm({ ...form, customer_phone: e.target.value })} />
      <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
        <option value="">Select service</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>{s.name} — NPR {s.price} ({s.duration} min)</option>
        ))}
      </select>
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
      <textarea placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <button type="submit" disabled={loading}>{loading ? "Booking..." : "Book Appointment"}</button>
    </form>
  );
}