"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Service } from "@/types";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

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
    <div className="mx-auto max-w-xl">
      <div className="mb-6 text-center">
        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-2xl shadow-md shadow-indigo-200">
          <Calendar size={28} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Book an Appointment</h2>
        <p className="mt-1 text-sm text-gray-500">Fill in the customer and service details below</p>
      </div>

      <form className="card !p-8" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <div className="mb-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Customer details
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Customer name</label>
              <input
                placeholder="e.g. Ram Sharma"
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone number</label>
              <input
                placeholder="e.g. 98XXXXXXXX"
                value={form.customer_phone}
                onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Appointment
          </p>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Service</label>
            <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — NPR {s.price} ({s.duration} min)
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Time</label>
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Notes (optional)</label>
          <textarea
            placeholder="Any special requests..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <button type="submit" disabled={loading} className="w-full">
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}