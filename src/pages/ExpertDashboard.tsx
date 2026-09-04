import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type ExpertProfile = {
  id: string;
  bio: string | null;
  specialization: string | null;
  experience_years: number | null;
  qualification: string | null;
  hourly_rate: number | null;
  is_verified: boolean;
  is_active: boolean;
};

type Booking = {
  id: string;
  booking_date: string;
  start_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  services: {
    title: string;
    price: number;
    duration_minutes: number;
  } | null;
};

function ExpertDashboard() {
  const navigate = useNavigate();

  const [expert, setExpert] = useState<ExpertProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Three-dot menu
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Delete confirmation
  const [deleteBookingId, setDeleteBookingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setEmail(user.email || "");

      // Get expert profile
      const { data: expertData, error: expertError } =
        await supabase
          .from("expert_profiles")
          .select(`
            id,
            bio,
            specialization,
            experience_years,
            qualification,
            hourly_rate,
            is_verified,
            is_active
          `)
          .eq("profile_id", user.id)
          .maybeSingle();

      if (expertError) {
        console.error("Expert profile error:", expertError);
        setError("Unable to load expert profile.");
        return;
      }

      if (!expertData) {
        setError(
          "Expert profile not found. Please create your expert profile first."
        );
        return;
      }

      setExpert(expertData);

      // Get services created by this expert
      const { data: serviceData, error: serviceError } =
        await supabase
          .from("services")
          .select("id")
          .eq("expert_id", expertData.id);

      if (serviceError) {
        console.error("Services query error:", serviceError);
        setError("Unable to load your services.");
        return;
      }

      const serviceIds = (serviceData || []).map(
        (service) => service.id
      );

      // No services = no bookings
      if (serviceIds.length === 0) {
        setBookings([]);
        return;
      }

      // Get bookings for this expert's services
      const { data: bookingData, error: bookingError } =
        await supabase
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
              price,
              duration_minutes
            )
          `)
          .in("service_id", serviceIds)
          .order("booking_date", { ascending: true })
          .order("start_time", { ascending: true });

      if (bookingError) {
        console.error("Bookings query error:", bookingError);
        setError("Unable to load bookings.");
        return;
      }

      const formattedBookings: Booking[] = (
        bookingData || []
      ).map((item: any) => ({
        id: item.id,
        booking_date: item.booking_date,
        start_time: item.start_time,
        status: item.status,
        notes: item.notes,
        created_at: item.created_at,
        services: Array.isArray(item.services)
          ? item.services[0] || null
          : item.services || null,
      }));

      setBookings(formattedBookings);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(
        "Something went wrong while loading the dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (
    bookingId: string,
    status: string
  ) => {
    try {
      setActionLoading(bookingId);
      setMessage("");
      setError("");
      setOpenMenuId(null);

      const { error: updateError } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", bookingId);

      if (updateError) {
        console.error("Status update error:", updateError);
        setError("Unable to update booking status.");
        return;
      }

      setMessage(
        status === "confirmed"
          ? "Appointment confirmed successfully."
          : status === "cancelled"
          ? "Appointment cancelled successfully."
          : "Appointment marked as completed."
      );

      await loadDashboard();
    } catch (err) {
      console.error("Status error:", err);
      setError("Something went wrong.");
    } finally {
      setActionLoading(null);
    }
  };

  const deleteAppointment = async () => {
    if (!deleteBookingId) return;

    try {
      setDeleteLoading(true);
      setError("");
      setMessage("");

      const { error: deleteError } = await supabase
        .from("bookings")
        .delete()
        .eq("id", deleteBookingId);

      if (deleteError) {
        console.error("Delete booking error:", deleteError);
        setError(
          "Unable to delete appointment. Please try again."
        );
        return;
      }

      setBookings((currentBookings) =>
        currentBookings.filter(
          (booking) => booking.id !== deleteBookingId
        )
      );

      setMessage("Appointment deleted successfully.");
      setDeleteBookingId(null);
      setOpenMenuId(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Something went wrong while deleting.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
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

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const pendingBookings = bookings.filter(
    (booking) =>
      booking.status.toLowerCase() === "pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) =>
      booking.status.toLowerCase() === "confirmed"
  ).length;

  const completedBookings = bookings.filter(
    (booking) =>
      booking.status.toLowerCase() === "completed"
  ).length;

  const totalRevenue = bookings
    .filter(
      (booking) =>
        booking.status.toLowerCase() !== "cancelled" &&
        booking.status.toLowerCase() !== "canceled"
    )
    .reduce(
      (total, booking) =>
        total + (booking.services?.price || 0),
      0
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600">
            Loading expert dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      onClick={() => setOpenMenuId(null)}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              FREEWILL
            </h1>

            <p className="text-xs text-gray-500">
              Expert Dashboard
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/home"
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>

            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/login");
              }}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4">
            {message}
          </div>
        )}

        {/* Welcome */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-sm text-gray-500">
                Welcome back 👋
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Expert Dashboard
              </h2>

              <p className="text-gray-500 mt-2">
                {email}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/expert-profile"
                className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                ✏️ Edit Profile
              </Link>

              <Link
                to="/expert-services"
                className="px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
              >
                🛠️ Manage Services
              </Link>
            </div>
          </div>
        </section>

        {/* Expert Status */}
        {expert && (
          <section className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {expert.specialization ||
                    "Expert Profile"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {expert.qualification ||
                    "Qualification not added"}

                  {expert.experience_years !== null &&
                    ` • ${expert.experience_years} years experience`}
                </p>

                {expert.hourly_rate !== null && (
                  <p className="text-sm text-gray-600 mt-2">
                    Hourly Rate:{" "}
                    <span className="font-semibold">
                      ₹{expert.hourly_rate}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    expert.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {expert.is_active
                    ? "● Active"
                    : "● Inactive"}
                </span>

                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    expert.is_verified
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {expert.is_verified
                    ? "✓ Verified"
                    : "⏳ Pending Verification"}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="text-3xl mb-4">📅</div>

            <p className="text-sm text-gray-500">
              Total Bookings
            </p>

            <p className="text-3xl font-bold text-gray-900 mt-1">
              {bookings.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="text-3xl mb-4">⏳</div>

            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="text-3xl font-bold text-gray-900 mt-1">
              {pendingBookings}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="text-3xl mb-4">✅</div>

            <p className="text-sm text-gray-500">
              Confirmed
            </p>

            <p className="text-3xl font-bold text-gray-900 mt-1">
              {confirmedBookings}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {completedBookings} completed
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="text-3xl mb-4">💰</div>

            <p className="text-sm text-gray-500">
              Booking Value
            </p>

            <p className="text-3xl font-bold text-gray-900 mt-1">
              ₹{totalRevenue}
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link
              to="/expert-profile"
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">👤</div>

              <h4 className="font-bold text-gray-900">
                Edit Profile
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Update your professional information.
              </p>
            </Link>

            <Link
              to="/expert-services"
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">🛠️</div>

              <h4 className="font-bold text-gray-900">
                Manage Services
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Create and manage your sessions.
              </p>
            </Link>

            <button
              type="button"
              onClick={loadDashboard}
              className="text-left bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">🔄</div>

              <h4 className="font-bold text-gray-900">
                Refresh Bookings
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Check for new appointment requests.
              </p>
            </button>
          </div>
        </section>

        {/* Appointments */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Appointment Requests
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Manage sessions booked by users.
              </p>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
              <div className="text-5xl mb-4">📅</div>

              <h4 className="text-xl font-bold text-gray-900">
                No bookings yet
              </h4>

              <p className="text-gray-500 mt-2">
                New appointment requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    {/* Booking information */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-xl font-bold text-gray-900">
                          {booking.services?.title ||
                            "Counseling Session"}
                        </h4>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-600">
                        <span>
                          📅{" "}
                          {formatDate(booking.booking_date)}
                        </span>

                        <span>
                          ⏰{" "}
                          {formatTime(booking.start_time)}
                        </span>

                        {booking.services && (
                          <span>
                            ⌛{" "}
                            {booking.services.duration_minutes}{" "}
                            min
                          </span>
                        )}

                        {booking.services && (
                          <span className="font-semibold text-gray-900">
                            ₹{booking.services.price}
                          </span>
                        )}
                      </div>

                      {booking.notes && (
                        <div className="mt-4 bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            User Notes
                          </p>

                          <p className="text-sm text-gray-700 mt-1">
                            {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-start lg:self-center">
                      {booking.status.toLowerCase() ===
                        "pending" && (
                        <>
                          <button
                            type="button"
                            disabled={
                              actionLoading === booking.id
                            }
                            onClick={() =>
                              updateBookingStatus(
                                booking.id,
                                "confirmed"
                              )
                            }
                            className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
                          >
                            {actionLoading === booking.id
                              ? "Updating..."
                              : "✓ Confirm"}
                          </button>

                          <button
                            type="button"
                            disabled={
                              actionLoading === booking.id
                            }
                            onClick={() =>
                              updateBookingStatus(
                                booking.id,
                                "cancelled"
                              )
                            }
                            className="px-4 py-2.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm font-semibold hover:bg-red-100 transition disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {booking.status.toLowerCase() ===
                        "confirmed" && (
                        <button
                          type="button"
                          disabled={
                            actionLoading === booking.id
                          }
                          onClick={() =>
                            updateBookingStatus(
                              booking.id,
                              "completed"
                            )
                          }
                          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                          {actionLoading === booking.id
                            ? "Updating..."
                            : "✓ Mark Completed"}
                        </button>
                      )}

                      {/* Three-dot menu */}
                      <div className="relative">
                        <button
                          type="button"
                          aria-label="Appointment options"
                          onClick={(e) => {
                            e.stopPropagation();

                            setOpenMenuId((current) =>
                              current === booking.id
                                ? null
                                : booking.id
                            );
                          }}
                          className="w-11 h-11 rounded-xl border border-gray-200 bg-white text-gray-700 text-2xl font-bold hover:bg-gray-50 transition flex items-center justify-center"
                        >
                          ⋮
                        </button>

                        {openMenuId === booking.id && (
                          <div
                            className="absolute right-0 top-12 z-30 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
                            onClick={(e) =>
                              e.stopPropagation()
                            }
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                setDeleteBookingId(
                                  booking.id
                                );
                              }}
                              className="w-full px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                            >
                              🗑️ Delete Appointment
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteBookingId && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          onClick={() => {
            if (!deleteLoading) {
              setDeleteBookingId(null);
            }
          }}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗑️</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Delete Appointment?
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to permanently delete
                this appointment?
              </p>

              <p className="text-xs text-red-500 mt-3">
                This action cannot be undone.
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  disabled={deleteLoading}
                  onClick={() =>
                    setDeleteBookingId(null)
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Keep Appointment
                </button>

                <button
                  type="button"
                  disabled={deleteLoading}
                  onClick={deleteAppointment}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-50"
                >
                  {deleteLoading
                    ? "Deleting..."
                    : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpertDashboard;
