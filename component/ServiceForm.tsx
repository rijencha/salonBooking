"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Service } from "@/types";

interface ServiceFormProps {
  onSuccess: () => void;
  editingService?: Service | null;
  onCancelEdit?: () => void;
}

export default function ServiceForm({ onSuccess, editingService, onCancelEdit }: ServiceFormProps) {
  const [form, setForm] = useState({ name: "", price: "", duration: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = !!editingService;

  useEffect(() => {
    if (editingService) {
      setForm({
        name: editingService.name,
        price: String(editingService.price),
        duration: String(editingService.duration),
      });
    } else {
      setForm({ name: "", price: "", duration: "" });
    }
    setError("");
  }, [editingService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Service name is required.");
    if (!form.price || Number(form.price) <= 0) return setError("Price must be a positive number.");
    if (!form.duration || Number(form.duration) <= 0) return setError("Duration must be greater than zero.");

    setLoading(true);
    try {
      const data = { name: form.name, price: Number(form.price), duration: Number(form.duration) };
      if (isEditing && editingService) {
        await api.updateService(editingService.id, data);
      } else {
        await api.createService(data);
      }
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
      <h3>{isEditing ? "Edit Service" : "Add Service"}</h3>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Service name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price (NPR)"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
      />

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="flex-1">
          {loading ? (isEditing ? "Saving..." : "Adding...") : isEditing ? "Save Changes" : "Add Service"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}