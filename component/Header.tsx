"use client";

import { Scissors } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/appointments", label: "Appointments" },
  { href: "/services", label: "Services" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-lg shadow-sm shadow-indigo-200">
            <Scissors size={20} className="text-white" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-gray-900">Salon Booking</p>
            <p className="text-[11px] font-medium text-gray-400">Management Dashboard</p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  active
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[15px] left-0 right-0 h-0.5 rounded-full bg-indigo-600" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}