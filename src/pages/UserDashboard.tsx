import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Profile = {
  full_name: string | null;
  email: string | null;
  role: string | null;
};

type Booking = {
  id: string;
  booking_date: string;
  start_time: string;
  status: string;
  notes: string | null;
};

function UserDashboard() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          navigate("/login");
          return;
        }

        setUserEmail(user.email || "");

        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, email, role")
          .eq("id", user.id)
          .maybeSingle();

        if (profileData) {
          setProfile(profileData);
        }

        const { data: bookingData, error: bookingError } = await supabase
          .from("bookings")
          .select("id, booking_date, start_time, status, notes")
          .eq("user_id", user.id)
          .order("booking_date", { ascending: false })
          .order("start_time", { ascending: false });

        if (bookingError) {
          console.error("Booking loading error:", bookingError);
        }

        setBookings(bookingData || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        alert(error.message);
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Unable to logout. Please try again.");
    } finally {
      setLoggingOut(false);
    }
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
    if (status === "confirmed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700";
    }

    if (status === "completed") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4ed] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#d8c9a8] border-t-[#173d3a] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-[#173d3a] font-semibold">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#173d3a]">

      {/* Header */}
      <header className="bg-[#173d3a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">

          <Link to="/" className="text-xl font-bold tracking-[0.2em]">
            FREEWILL
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/10 transition text-sm font-semibold disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome */}
        <section className="bg-white rounded-3xl shadow-lg border border-[#e8dfcf] p-7 md:p-9 mb-8">

          <p className="text-sm uppercase tracking-[0.2em] text-[#b58a3a] font-semibold mb-2">
            User Dashboard
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Welcome
            {profile?.full_name ? `, ${profile.full_name}` : ""} 👋
          </h1>

          <p className="text-gray-600">
            Manage your FREEWILL wellbeing journey and appointments from here.
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {profile?.email || userEmail}
          </p>

        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">

          <Link
            to="/booking"
            className="bg-[#173d3a] text-white rounded-3xl p-7 shadow-lg hover:-translate-y-1 transition"
          >
            <div className="text-3xl mb-4">📅</div>

            <h2 className="text-xl font-bold mb-2">
              Book Appointment
            </h2>

            <p className="text-white/70 text-sm">
              Choose an expert and schedule your session.
            </p>
          </Link>

          <Link
            to="/assessment"
            className="bg-white rounded-3xl p-7 shadow-lg border border-[#e8dfcf] hover:-translate-y-1 transition"
          >
            <div className="text-3xl mb-4">🧠</div>

            <h2 className="text-xl font-bold mb-2">
              Self Assessment
            </h2>

            <p className="text-gray-600 text-sm">
              Complete your wellbeing self-assessment.
            </p>
          </Link>

          <Link
            to="/"
            className="bg-white rounded-3xl p-7 shadow-lg border border-[#e8dfcf] hover:-translate-y-1 transition"
          >
            <div className="text-3xl mb-4">🏠</div>

            <h2 className="text-xl font-bold mb-2">
              Back to Home
            </h2>

            <p className="text-gray-600 text-sm">
              Explore FREEWILL and our services.
            </p>
          </Link>

        </section>

        {/* Bookings */}
        <section className="bg-white rounded-3xl shadow-lg border border-[#e8dfcf] p-7 md:p-9">

          <div className="flex items-center justify-between gap-4 mb-6">

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#b58a3a] font-semibold">
                Appointments
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mt-1">
                My Bookings
              </h2>
            </div>

            <span className="px-4 py-2 rounded-full bg-[#f7f4ed] text-sm font-semibold">
              {bookings.length} Booking{bookings.length !== 1 ? "s" : ""}
            </span>

          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-[#e8dfcf] rounded-2xl">

              <div className="text-5xl mb-4">
                📅
              </div>

              <h3 className="text-xl font-bold mb-2">
                No appointments yet
              </h3>

              <p className="text-gray-500 mb-6">
                You haven't booked an appointment yet.
              </p>

              <Link
                to="/booking"
                className="inline-block px-6 py-3 rounded-xl bg-[#173d3a] text-white font-semibold hover:bg-[#24544f] transition"
              >
                Book Your First Appointment
              </Link>

            </div>
          ) : (
            <div className="space-y-4">

              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-[#e8dfcf] rounded-2xl p-5 hover:shadow-md transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h3 className="font-bold text-lg mb-2">
                        FREEWILL Appointment
                      </h3>

                      <div className="space-y-1 text-sm text-gray-600">

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

                      </div>

                    </div>

                    <div>
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                  </div>

                  {booking.notes && (
                    <div className="mt-4 pt-4 border-t border-[#eee7da]">
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                        Booking Details
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

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} FREEWILL – Human Empowerment
      </footer>

    </div>
  );
}

export default UserDashboard;
