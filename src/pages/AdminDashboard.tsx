import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  created_at: string;
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
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<Profile[]>([]);
  const [experts, setExperts] = useState<Profile[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAdminDashboard();
  }, []);

  const loadAdminDashboard = async () => {
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

      // Check admin role
      const { data: adminProfile, error: adminError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (adminError) {
        console.error(adminError);
        setError("Unable to verify admin account.");
        return;
      }

      if (!adminProfile || adminProfile.role !== "admin") {
        setError(
          "Access denied. Only administrators can access this dashboard."
        );
        return;
      }

      // Load users
      const { data: userData, error: usersError } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, created_at")
        .eq("role", "user")
        .order("created_at", { ascending: false });

      if (usersError) {
        console.error(usersError);
      }

      // Load experts
      const { data: expertData, error: expertsError } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, created_at")
        .eq("role", "expert")
        .order("created_at", { ascending: false });

      if (expertsError) {
        console.error(expertsError);
      }

      // Load all bookings
      const { data: bookingData, error: bookingsError } = await supabase
        .from("bookings")
        .select(
          "id, user_id, service_id, booking_date, start_time, status, notes, created_at"
        )
        .order("created_at", { ascending: false });

      if (bookingsError) {
        console.error(bookingsError);
        setError(
          `Unable to load bookings: ${bookingsError.message}`
        );
      }

      setUsers(userData || []);
      setExperts(expertData || []);
      setBookings(bookingData || []);
    } catch (error) {
      console.error("Admin dashboard error:", error);
      setError("Something went wrong while loading the dashboard.");
    } finally {
      setLoading(false);
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
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error && users.length === 0 && experts.length === 0 && bookings.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f4ed] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center border border-[#e8dfcf]">

          <div className="text-5xl mb-5">
            🔒
          </div>

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
              Admin Portal
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

        {/* Welcome */}
        <section className="bg-white rounded-3xl shadow-lg border border-[#e8dfcf] p-7 md:p-9 mb-8">

          <p className="text-sm uppercase tracking-[0.2em] text-[#b58a3a] font-semibold mb-2">
            Administration
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            FREEWILL Admin Dashboard 👑
          </h1>

          <p className="text-gray-600 mt-3">
            Manage users, experts and appointment activity.
          </p>

        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">

          <div className="bg-white rounded-3xl shadow-md border border-[#e8dfcf] p-6">
            <p className="text-sm text-gray-500 font-semibold">
              Total Users
            </p>

            <p className="text-3xl font-black mt-2">
              {users.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-[#e8dfcf] p-6">
            <p className="text-sm text-gray-500 font-semibold">
              Total Experts
            </p>

            <p className="text-3xl font-black mt-2">
              {experts.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-[#e8dfcf] p-6">
            <p className="text-sm text-gray-500 font-semibold">
              Total Bookings
            </p>

            <p className="text-3xl font-black mt-2">
              {bookings.length}
            </p>
          </div>

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

        </section>

        {/* Users */}
        <section className="bg-white rounded-3xl shadow-lg border border-[#e8dfcf] p-7 md:p-9 mb-8">

          <div className="flex items-center justify-between mb-6">

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#b58a3a] font-semibold">
                Users
              </p>

              <h2 className="text-2xl font-bold mt-1">
                Registered Users
              </h2>
            </div>

            <span className="px-4 py-2 rounded-full bg-[#f7f4ed] text-sm font-bold">
              {users.length}
            </span>

          </div>

          {users.length === 0 ? (
            <p className="text-gray-500 py-6">
              No registered users found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="py-4 pr-4">Name</th>
                    <th className="py-4 pr-4">Email</th>
                    <th className="py-4 pr-4">Role</th>
                    <th className="py-4">Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100"
                    >
                      <td className="py-4 pr-4 font-semibold">
                        {user.full_name || "Unnamed User"}
                      </td>

                      <td className="py-4 pr-4 text-gray-600">
                        {user.email || "No email"}
                      </td>

                      <td className="py-4 pr-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                          {user.role}
                        </span>
                      </td>

                      <td className="py-4 text-gray-600 text-sm">
                        {formatDate(user.created_at.split("T")[0])}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* Experts */}
        <section className="bg-white rounded-3xl shadow-lg border border-[#e8dfcf] p-7 md:p-9 mb-8">

          <div className="flex items-center justify-between mb-6">

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#b58a3a] font-semibold">
                Experts
              </p>

              <h2 className="text-2xl font-bold mt-1">
                Registered Experts
              </h2>
            </div>

            <span className="px-4 py-2 rounded-full bg-[#f7f4ed] text-sm font-bold">
              {experts.length}
            </span>

          </div>

          {experts.length === 0 ? (
            <p className="text-gray-500 py-6">
              No experts found.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">

              {experts.map((expert) => (
                <div
                  key={expert.id}
                  className="border border-[#e8dfcf] rounded-2xl p-5"
                >

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <h3 className="font-bold text-lg">
                        {expert.full_name || "Unnamed Expert"}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        {expert.email || "No email"}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      EXPERT
                    </span>

                  </div>

                  <p className="text-xs text-gray-400 mt-4">
                    Joined{" "}
                    {formatDate(expert.created_at.split("T")[0])}
                  </p>

                </div>
              ))}

            </div>
          )}

        </section>

        {/* Bookings */}
        <section className="bg-white rounded-3xl shadow-lg border border-[#e8dfcf] p-7 md:p-9">

          <div className="flex items-center justify-between mb-6">

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#b58a3a] font-semibold">
                Appointments
              </p>

              <h2 className="text-2xl font-bold mt-1">
                All Bookings
              </h2>
            </div>

            <button
              onClick={loadAdminDashboard}
              className="px-5 py-2.5 rounded-xl border border-[#173d3a] text-[#173d3a] font-semibold hover:bg-[#173d3a] hover:text-white transition"
            >
              Refresh
            </button>

          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-[#e8dfcf] rounded-2xl">
              <div className="text-5xl mb-4">
                📭
              </div>

              <h3 className="text-xl font-bold mb-2">
                No bookings yet
              </h3>

              <p className="text-gray-500">
                Appointment activity will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-[#e8dfcf] rounded-2xl p-5"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h3 className="font-bold text-lg">
                        Booking #{booking.id.slice(0, 8)}
                      </h3>

                      <div className="mt-2 space-y-1 text-sm text-gray-600">

                        <p>
                          <span className="font-semibold">
                            Date:
                          </span>{" "}
                          {formatDate(booking.booking_date)}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Time:
                          </span>{" "}
                          {formatTime(booking.start_time)}
                        </p>

                        <p>
                          <span className="font-semibold">
                            User ID:
                          </span>{" "}
                          {booking.user_id.slice(0, 8)}...
                        </p>

                        <p>
                          <span className="font-semibold">
                            Service ID:
                          </span>{" "}
                          {booking.service_id.slice(0, 8)}...
                        </p>

                      </div>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${getStatusStyle(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>

                  </div>

                  {booking.notes && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Notes
                      </p>

                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {booking.notes}
                      </p>
                    </div>
                  )}

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

export default AdminDashboard;
