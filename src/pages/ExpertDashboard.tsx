import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type ExpertProfile = {
  id: string;
  profile_id: string;
  bio: string | null;
  specialization: string | null;
  experience_years: number | null;
  qualification: string | null;
  hourly_rate: number | null;
};

type Service = {
  title: string;
  description: string | null;
  duration_minutes: number;
  price: number;
};

type Booking = {
  id: string;
  user_id: string;
  service_id: string;
  booking_date: string;
  start_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  service?: Service | null;
};

type SupabaseBooking = Omit<Booking, "service"> & {
  service: Service | Service[] | null;
};

function ExpertDashboard() {
  const navigate = useNavigate();

  const [expertProfile, setExpertProfile] =
    useState<ExpertProfile | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadExpertDashboard();
  }, []);

  const loadExpertDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/login");
        return;
      }

      // Check whether logged-in user is an expert
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(profileError);
        setError("Unable to verify your account.");
        return;
      }

      if (!profileData || profileData.role !== "expert") {
        setError(
          "Access denied. Only registered experts can access this dashboard."
        );
        return;
      }

      // Get expert profile
      const { data: expertData, error: expertError } = await supabase
        .from("expert_profiles")
        .select(
          "id, profile_id, bio, specialization, experience_years, qualification, hourly_rate"
        )
        .eq("profile_id", user.id)
        .maybeSingle();

      if (expertError) {
        console.error(expertError);
        setError("Unable to load expert profile.");
        return;
      }

      if (!expertData) {
        setError("Expert profile not found.");
        return;
      }

      setExpertProfile(expertData);

      // Get bookings for this expert's services
      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("id")
        .eq("expert_id", expertData.id);

      if (serviceError) {
        console.error(serviceError);
        setError("Unable to load your services.");
        return;
      }

      const serviceIds = (serviceData || []).map(
        (service) => service.id
      );

      if (serviceIds.length === 0) {
        setBookings([]);
        return;
      }

      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select(
          `
          id,
          user_id,
          service_id,
          booking_date,
          start_time,
          status,
          notes,
          created_at,
          service:services (
            title,
            description,
            duration_minutes,
            price
          )
        `
        )
        .in("service_id", serviceIds)
        .order("booking_date", { ascending: true })
        .order("start_time", { ascending: true });

      if (bookingError) {
        console.error(bookingError);
        setError(
          `Unable to load bookings: ${bookingError.message}`
        );
        return;
      }

      // Supabase can return the related service as an array.
      // Convert it into the single service object our UI expects.
      const normalizedBookings: Booking[] = (
        (bookingData || []) as SupabaseBooking[]
      ).map((booking) => ({
        ...booking,
        service: Array.isArray(booking.service)
          ? booking.service[0] || null
          : booking.service,
      }));

      setBookings(normalizedBookings);
    } catch (error) {
      console.error("Expert dashboard error:", error);
      setError("Something went wrong while loading the dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (
    bookingId: string,
    status: "confirmed" | "rejected"
  ) => {
    try {
      setActionLoading(bookingId);
      setError("");

      const { error: updateError } = await supabase
        .from("bookings")
        .update({
          status,
        })
        .eq("id", bookingId);

      if (updateError) {
        console.error(updateError);
        setError(`Unable to update booking: ${updateError.message}`);
        return;
      }

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status,
              }
            : booking
        )
      );
    } catch (error) {
      console.error(error);
      setError("Something went wrong while updating the booking.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      alert(logoutError.message);
      return;
    }

    navigate("/login");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const rejectedCount = bookings.filter(
    (booking) => booking.status === "rejected"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4ed] flex items-center justify-center">
        <div className="text-center">
          <div className="w-11 h-11 border-4 border-[#d8c9a8] border-t-[#173d3a] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-[#173d3a] font-semibold">
            Loading expert dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error && !expertProfile) {
    return (
      <div className="min-h-screen bg-[#f7f4ed] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center border border-[#e8dfcf]">
          <div className="text-5xl mb-5">🔒</div>

          <h1 className="text-2xl font-bold text-[#173d3a] mb-3">
            Access Restricted
          </h1>

          <p className="text-gray-600 mb-6">
            {error}
          </p>

          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl bg-[#173d3a] text-white font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#173d3a]">
      {/* Header */}
      <header className="bg-[#173d3a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="text-xl font-bold tracking-[0.2em]"
          >
            FREEWILL
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden md:block text-sm text-white/70">
              Expert Dashboard
            </span>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/10 transition text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Profile Header */}
        <section className="bg-white rounded-3xl shadow-lg border border-[#e8dfcf] p-7 md:p-9 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#b58a3a] font-semibold mb-2">
                Expert Portal
              </p>

              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome, Expert 👋
              </h1>

              {expertProfile?.specialization && (
                <p className="text-gray-600 mt-3">
                  {expertProfile.specialization}
                </p>
              )}

              {expertProfile?.experience_years !== null &&
                expertProfile?.experience_years !== undefined && (
                  <p className="text-sm text-gray-500 mt-1">
                    {expertProfile.experience_years} years of experience
                  </p>
                )}
            </div>

            <div className="bg-[#f7f4ed] rounded-2xl px-6 py-5 min-w-[180px]">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Total Requests
              </p>

              <p className="text-3xl font-black text-[#173d3a] mt-1">
                {bookings.length}
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-3xl shadow-md border border-[#e8dfcf] p-6">
            <p className="text-sm text-gray-500 font-semibold">
              Pending
            </p>

            <p className="text-3xl font-black text-[#b58a3a] mt-2">
              {pendingCount}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-[#e8dfcf] p-6">
            <p className="text-sm text-gray-500 font-semibold">
              Confirmed
            </p>

            <p className="text-3xl font-black text-green-600 mt-2">
              {confirmedCount}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-[#e8dfcf] p-6">
            <p className="text-sm text-gray-500 font-semibold">
              Rejected
            </p>

            <p className="text-3xl font-black text-red-600 mt-2">
              {rejectedCount}
            </p>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Bookings */}
        <section className="bg-white rounded-3xl shadow-lg border border-[#e8dfcf] p-7 md:p-9">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#b58a3a] font-semibold">
                Appointment Requests
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mt-1">
                Incoming Bookings
              </h2>
            </div>

            <button
              onClick={loadExpertDashboard}
              className="px-5 py-2.5 rounded-xl border border-[#173d3a] text-[#173d3a] font-semibold hover:bg-[#173d3a] hover:text-white transition"
            >
              Refresh
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-14 border-2 border-dashed border-[#e8dfcf] rounded-2xl">
              <div className="text-5xl mb-4">📭</div>

              <h3 className="text-xl font-bold mb-2">
                No booking requests yet
              </h3>

              <p className="text-gray-500">
                New appointment requests from users will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-[#e8dfcf] rounded-2xl p-6 hover:shadow-md transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold">
                          {booking.service?.title ||
                            "FREEWILL Session"}
                        </h3>

                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${getStatusStyle(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                        <p>
                          <span className="font-semibold text-[#173d3a]">
                            Date:
                          </span>{" "}
                          {formatDate(booking.booking_date)}
                        </p>

                        <p>
                          <span className="font-semibold text-[#173d3a]">
                            Time:
                          </span>{" "}
                          {formatTime(booking.start_time)}
                        </p>

                        {booking.service?.duration_minutes && (
                          <p>
                            <span className="font-semibold text-[#173d3a]">
                              Duration:
                            </span>{" "}
                            {booking.service.duration_minutes} minutes
                          </p>
                        )}

                        {booking.service?.price !== undefined && (
                          <p>
                            <span className="font-semibold text-[#173d3a]">
                              Price:
                            </span>{" "}
                            ₹{booking.service.price}
                          </p>
                        )}
                      </div>

                      {booking.notes && (
                        <div className="mt-5 bg-[#f7f4ed] rounded-xl p-4">
                          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">
                            Client Details
                          </p>

                          <p className="text-sm text-gray-700 whitespace-pre-line">
                            {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {booking.status === "pending" && (
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[150px]">
                        <button
                          onClick={() =>
                            updateBookingStatus(
                              booking.id,
                              "confirmed"
                            )
                          }
                          disabled={actionLoading === booking.id}
                          className="px-5 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition disabled:opacity-50"
                        >
                          {actionLoading === booking.id
                            ? "Updating..."
                            : "✓ Accept"}
                        </button>

                        <button
                          onClick={() =>
                            updateBookingStatus(
                              booking.id,
                              "rejected"
                            )
                          }
                          disabled={actionLoading === booking.id}
                          className="px-5 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
                        >
                          {actionLoading === booking.id
                            ? "Updating..."
                            : "✕ Reject"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="text-center py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} FREEWILL – Human Empowerment
      </footer>
    </div>
  );
}

export default ExpertDashboard;
