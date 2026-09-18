import type { AppointmentStatus } from "@/types";

const STATUS_STYLES: Record<AppointmentStatus, { bg: string; text: string; dot: string }> = {
  Pending: { bg: "#ff6200", text: "#f5f4f3", dot: "#ffffff" },
  Confirmed: { bg: "#0d44b9", text: "#f6f7f9", dot: "#ffffff" },
  Completed: { bg: "#15803d", text: "#eafaf0", dot: "#ffffff" },
  Cancelled: { bg: "#b91c1c", text: "#fdecec", dot: "#ffffff" },
};

export default function StatusBadge({ status }: { status: AppointmentStatus }) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: style.dot }}
      />
      {status}
    </span>
  );
}