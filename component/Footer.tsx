export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-1 px-6 py-6 text-center sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Salon Booking System
        </p>
        <p className="text-xs text-gray-400">
          Built for Vrit Technologies Assessment
        </p>
      </div>
    </footer>
  );
}