import { Calendar, Scissors } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl py-8 text-center">
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
    </div>
  );
}