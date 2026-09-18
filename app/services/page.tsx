"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Service } from "@/types";
import ServiceForm from "@/component/ServiceForm";
import Servicetable from "@/component/Servicetable";
import Loading from "@/component/Loading";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const load = () => {
    setLoading(true);
    api.getServices().then(setServices).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSuccess = () => {
    setEditingService(null);
    load();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Services</h2>
        <p className="mt-1 text-sm text-gray-500">
          {loading
            ? "Loading services..."
            : `${services.length} ${services.length === 1 ? "service" : "services"} available`}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <ServiceForm
          onSuccess={handleSuccess}
          editingService={editingService}
          onCancelEdit={() => setEditingService(null)}
        />
        {loading ? (
          <Loading />
        ) : (
          <Servicetable services={services} onChange={load} onEdit={setEditingService} />
        )}
      </div>
    </div>
  );
}