import type {AppointmentStatus} from "@/types";

const COLORS: Record<AppointmentStatus, string> = {
  Pending: "bg-yellow-500",
  Confirmed: "bg-blue-500",
  Completed: "bg-green-500",
  Cancelled: "bg-red-500",
};

export default function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span className={`inline-block w-3 h-3 rounded-full ${COLORS[status]}`} />
  );
}