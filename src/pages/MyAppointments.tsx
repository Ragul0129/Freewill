import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Appointment = {
  id: string;
  booking_date: string;
  start_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  services:
    | {
        title: string;
        description: string | null;
        duration_minutes: number;
        price: number;
      }
    | null;
};

function MyAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error: bookingError } = await supabase
        .from("bookings")
        .select(`
          id,
          booking_date,
          start_time,
          status,
          notes,
          created_at,
          services (
            title,
            description,
            duration_minutes,
            price
          )
        `)
        .eq("user_id", user.id)
        .order("booking_date", { ascending: true })
        .order("start_time", { ascending: true });

      if (bookingError) {
        console.error("Appointments error:", bookingError);
        setError("Unable to load your appointments.");
        return;
      }

      setAppointments((data as Appointment[]) || []);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";

      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#173d3a]">

      {/* ================= HEADER ================= */}
      <header className="border-b border-[#e4ddce] bg-[#0d4743] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            to="/home"
            className="text-2xl font-black tracking-wide"
          >
            FREEWILL
          </Link>

          <Link
            to="/home"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition"
          >
            ← Back to Home
          </Link>

        </div>
      </header>


      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">

        {/* TITLE */}
        <div className="mb-10">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
            Your Account
          </p>

          <h1 className="mt-3 text-3xl font-black md:text-5xl">
            My Appointments
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            View your upcoming and previous FREEWILL counselling
            appointments in one place.
          </p>

        </div>


        {/* ERROR */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )}


        {/* LOADING */}
        {loading && (
          <div className="rounded-[2rem] bg-white p-12 text-center shadow-sm">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#0d4743]" />

            <p className="mt-5 font-semibold text-gray-600">
              Loading your appointments...
            </p>

          </div>
        )}


        {/* EMPTY */}
        {!loading && !error && appointments.length === 0 && (
          <div className="rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#edf4f2] text-4xl">
              📅
            </div>

            <h2 className="mt-6 text-2xl font-black">
              No Appointments Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
              You haven't booked any counselling sessions yet.
              Start your journey with FREEWILL today.
            </p>

            <Link
              to="/booking"
              className="mt-7 inline-block rounded-full bg-[#0d4743] px-7 py-4 font-bold text-white shadow-lg hover:bg-[#12554f] transition"
            >
              Book an Appointment →
            </Link>

          </div>
        )}


        {/* APPOINTMENTS */}
        {!loading && appointments.length > 0 && (
          <div className="space-y-6">

            {appointments.map((appointment) => (

              <div
                key={appointment.id}
                className="overflow-hidden rounded-[2rem] border border-[#e3ded2] bg-white shadow-sm transition hover:shadow-xl"
              >

                {/* TOP */}
                <div className="flex flex-col gap-5 border-b border-gray-100 p-6 md:flex-row md:items-center md:justify-between md:p-8">

                  <div className="flex items-start gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf4f2] text-2xl">
                      📅
                    </div>

                    <div>

                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                        Appointment
                      </p>

                      <h2 className="mt-1 text-xl font-black md:text-2xl">
                        {appointment.services?.title || "Counselling Session"}
                      </h2>

                    </div>

                  </div>


                  {/* STATUS */}
                  <span
                    className={`w-fit rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${getStatusStyle(
                      appointment.status
                    )}`}
                  >
                    {appointment.status || "Pending"}
                  </span>

                </div>


                {/* DETAILS */}
                <div className="grid gap-6 p-6 md:grid-cols-3 md:p-8">

                  {/* DATE */}
                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Date
                    </p>

                    <p className="mt-2 font-bold text-[#173d3a]">
                      {formatDate(appointment.booking_date)}
                    </p>

                  </div>


                  {/* TIME */}
                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Time
                    </p>

                    <p className="mt-2 font-bold text-[#173d3a]">
                      {formatTime(appointment.start_time)}
                    </p>

                  </div>


                  {/* PRICE */}
                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Price
                    </p>

                    <p className="mt-2 font-bold text-[#173d3a]">
                      ₹
                      {appointment.services?.price
                        ? Number(appointment.services.price).toLocaleString(
                            "en-IN"
                          )
                        : "—"}
                    </p>

                  </div>

                </div>


                {/* SERVICE INFO */}
                <div className="border-t border-gray-100 bg-[#faf9f5] px-6 py-6 md:px-8">

                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Session Details
                      </p>

                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">

                        <span>
                          ⏱️{" "}
                          {appointment.services?.duration_minutes || "—"} minutes
                        </span>

                        <span>•</span>

                        <span>
                          💬 Professional Support
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* NOTES */}
                  {appointment.notes && (
                    <div className="mt-5 rounded-xl bg-white p-4">

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Your Notes
                      </p>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {appointment.notes}
                      </p>

                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}


        {/* BOTTOM ACTIONS */}
        {!loading && (
          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/booking"
              className="rounded-full bg-[#0d4743] px-7 py-4 font-bold text-white shadow-lg hover:bg-[#12554f] transition"
            >
              + Book Another Appointment
            </Link>

            <Link
              to="/dashboard"
              className="rounded-full border-2 border-[#0d4743] px-7 py-4 font-bold text-[#0d4743] hover:bg-[#0d4743] hover:text-white transition"
            >
              Go to Dashboard
            </Link>

          </div>
        )}

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="bg-[#082f2d] py-8 text-center text-sm text-white/50">

        <p>
          © 2026 FREEWILL — Human Empowerment
        </p>

      </footer>

    </div>
  );
}

export default MyAppointments;
