"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Appointment, AppointmentStatus } from "@/types";
import AppointmentTable from "@/component/AppointmentTable";
import Loading from "@/component/Loading";
import { Calendar } from "lucide-react";

const STATUSES: AppointmentStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled"];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<AppointmentStatus | "">("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.getAppointments(filter).then(setAppointments).finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            <Calendar size={24} className="inline-block mr-2 text-gray-400" />
            Appointments
            </h2>
          <p className="mt-1 text-sm text-gray-500">
            {appointments.length} {appointments.length === 1 ? "appointment" : "appointments"}
            {filter && ` · filtered by ${filter}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as AppointmentStatus | "")}
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <Link
            href="/appointments/new"
            className="btn-link inline-flex items-center gap-1.5"
          >
            <span className="text-base leading-none">+</span> New Appointment
          </Link>
        </div>
      </div>

      {loading ? <Loading /> : <AppointmentTable appointments={appointments} onChange={load} />}
    </div>
  );
}