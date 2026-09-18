"use client";

import { useEffect, useState } from "react";
import { Calendar, Scissors, Clock, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Service, Appointment } from "@/types";
import StatusBadge from "@/component/StatusBadge";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {}).finally(() => setLoadingServices(false));
    api.getAppointments().then(setAppointments).catch(() => {}).finally(() => setLoadingAppointments(false));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const upcoming = appointments
    .filter((a) => a.date >= today && a.status !== "Cancelled" && a.status !== "Completed")
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-4xl py-8 text-center">
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
        Salon Booking System
      </h2>
      <p className="mx-auto mb-10 max-w-sm text-gray-500">
        Manage salon services and appointments in one place.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/appointments"
          className="card group flex flex-col items-start gap-2 !p-6 text-left no-underline transition-transform hover:-translate-y-0.5"
        >
          <Calendar size={24} className="text-gray-400" />
          <span className="text-base font-semibold text-gray-900">
            View Appointments
          </span>
          <span className="text-sm text-gray-500">
            See, filter, and update bookings
          </span>
          <span className="mt-2 text-sm font-medium text-indigo-600 group-hover:translate-x-0.5 transition-transform">
            Go to appointments →
          </span>
        </Link>

        <Link
          href="/services"
          className="card group flex flex-col items-start gap-2 !p-6 text-left no-underline transition-transform hover:-translate-y-0.5"
        >
          <Scissors size={24} className="text-gray-400" />
          <span className="text-base font-semibold text-gray-900">
            Manage Services
          </span>
          <span className="text-sm text-gray-500">
            Add, edit, or remove services
          </span>
          <span className="mt-2 text-sm font-medium text-indigo-600 group-hover:translate-x-0.5 transition-transform">
            Go to services →
          </span>
        </Link>
      </div>

      <div className="mt-10 grid gap-6 text-left lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Upcoming Appointments
            </h3>
            <Link href="/appointments" className="text-xs font-medium text-indigo-600 hover:underline">
              View all →
            </Link>
          </div>

          {loadingAppointments ? (
            <p className="text-sm text-gray-400">Loading appointments...</p>
          ) : upcoming.length === 0 ? (
            <div className="card flex flex-col items-center gap-2 py-10 text-center">
              <Calendar size={28} className="text-gray-300" />
              <p className="text-sm font-medium text-gray-500">No upcoming appointments</p>
              <p className="text-xs text-gray-400">Book one from the services list</p>
            </div>
          ) : (
            <div className="card !p-0 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {upcoming.map((a) => (
                  <li key={a.id} className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50">
                        <User size={16} className="text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{a.customer_name}</p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {a.service_name} · {a.date} · {a.time}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={a.status} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Available Services
            </h3>
            <span className="text-xs text-gray-400">Tap to book</span>
          </div>

          {loadingServices ? (
            <p className="text-sm text-gray-400">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-sm text-gray-400">No services available yet.</p>
          ) : (
            <div className="card !p-0 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/appointments/new?service=${s.id}`}
                      className="group flex items-center justify-between px-5 py-3.5 no-underline transition-colors hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{s.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={12} /> {s.duration} min
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-indigo-600">
                          NPR {s.price.toLocaleString()}
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}