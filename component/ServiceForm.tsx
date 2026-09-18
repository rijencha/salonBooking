import { useState } from "react";
import { api } from "@/lib/api";

export default function ServiceForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", price: "", duration: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Service name is required.");
    if (!form.price || Number(form.price) <= 0) return setError("Price must be a positive number.");
    if (!form.duration || Number(form.duration) <= 0) return setError("Duration must be greater than zero.");

    setLoading(true);
    try {
      await api.createService({ name: form.name, price: Number(form.price), duration: Number(form.duration) });
      setForm({ name: "", price: "", duration: "" });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Add Service</h3>
      {error && <p className="error">{error}</p>}
      <input placeholder="Service name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="number" placeholder="Price (NPR)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <input type="number" placeholder="Duration (minutes)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
      <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Service"}</button>
    </form>
  );
}