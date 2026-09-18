import { Suspense } from "react";
import AppointmentForm from "@/component/AppointmentForm";

export default function NewAppointmentPage() {
  return (
    <Suspense fallback={<p className="text-center text-sm text-gray-400">Loading...</p>}>
      <AppointmentForm />
    </Suspense>
  );
}