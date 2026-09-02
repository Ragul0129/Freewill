import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Service = {
  id: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  expert_id: string;
};

type Expert = {
  id: string;
  specialization: string | null;
  is_active: boolean;
  is_verified: boolean;
  profile: {
    full_name: string | null;
  } | null;
};

function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const serviceId = searchParams.get("service");

  const [service, setService] = useState<Service | null>(null);
  const [expert, setExpert] = useState<Expert | null>(null);

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (serviceId) {
      loadService();
    } else {
      setLoading(false);
    }
  }, [serviceId]);

  const loadService = async () => {
    try {
      setLoading(true);
      setError("");

      if (!serviceId) return;

      const { data: serviceData, error: serviceError } =
        await supabase
          .from("services")
          .select(`
            id,
            title,
            description,
            duration_minutes,
            price,
            expert_id
          `)
          .eq("id", serviceId)
          .eq("is_active", true)
          .single();

      if (serviceError || !serviceData) {
        console.error("Service error:", serviceError);
        setError("Unable to load this session.");
        return;
      }

      setService(serviceData);

      const { data: expertData, error: expertError } =
        await supabase
          .from("expert_profiles")
          .select(`
            id,
            specialization,
            is_active,
            is_verified,
            profiles (
              full_name
            )
          `)
          .eq("id", serviceData.expert_id)
          .single();

      if (expertError) {
        console.error("Expert error:", expertError);
        setError("Unable to load expert information.");
        return;
      }

      const formattedExpert: Expert = {
        id: expertData.id,
        specialization: expertData.specialization,
        is_active: expertData.is_active,
        is_verified: expertData.is_verified,
        profile: Array.isArray(expertData.profiles)
          ? expertData.profiles[0] || null
          : expertData.profiles || null,
      };

      setExpert(formattedExpert);
    } catch (err) {
      console.error("Load service error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const isPastTime = () => {
    if (!bookingDate || !startTime) return false;

    const today = getToday();

    if (bookingDate !== today) {
      return false;
    }

    const now = new Date();

    const [hours, minutes] = startTime.split(":");

    const selectedTime = new Date();
    selectedTime.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return selectedTime <= now;
  };

  const handleBooking = async () => {
    try {
      setError("");
      setSuccess("");

      if (!serviceId || !service) {
        setError("Please select a valid session.");
        return;
      }

      if (!bookingDate) {
        setError("Please select a booking date.");
        return;
      }

      if (!startTime) {
        setError("Please select a time.");
        return;
      }

      if (isPastTime()) {
        setError(
          "Please select a future time. The selected time has already passed."
        );
        return;
      }

      if (expert && !expert.is_active) {
        setError(
          "This expert is currently unavailable for new appointments."
        );
        return;
      }

      setBooking(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      /*
       * Check whether the same user already has a booking
       * for the same service, date and time.
       */
      const { data: existingBooking, error: existingError } =
        await supabase
          .from("bookings")
          .select("id, status")
          .eq("user_id", user.id)
          .eq("service_id", service.id)
          .eq("booking_date", bookingDate)
          .eq("start_time", startTime)
          .in("status", ["pending", "confirmed"])
          .maybeSingle();

      if (existingError) {
        console.error(
          "Existing booking check error:",
          existingError
        );
      }

      if (existingBooking) {
        setError(
          "You already have an active booking for this session at the selected time."
        );
        return;
      }

      /*
       * Check whether another confirmed/pending booking
       * already occupies the exact same expert slot.
       */
      const { data: serviceBookings, error: slotError } =
        await supabase
          .from("bookings")
          .select(`
            id,
            status,
            service_id,
            services!inner (
              expert_id
            )
          `)
          .eq("booking_date", bookingDate)
          .eq("start_time", startTime)
          .in("status", ["pending", "confirmed"]);

      if (slotError) {
        console.error("Slot check error:", slotError);
      }

      const sameExpertBooking = (serviceBookings || []).some(
        (item: any) => {
          const bookingService = Array.isArray(item.services)
            ? item.services[0]
            : item.services;

          return (
            bookingService?.expert_id === service.expert_id
          );
        }
      );

      if (sameExpertBooking) {
        setError(
          "This time slot is already requested or booked with this expert. Please choose another time."
        );
        return;
      }

      const { error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          service_id: service.id,
          booking_date: bookingDate,
          start_time: startTime,
          status: "pending",
          notes: notes.trim() || null,
        });

      if (bookingError) {
        console.error("Booking error:", bookingError);
        setError(bookingError.message);
        return;
      }

      setSuccess(
        "Your appointment request has been submitted successfully!"
      );

      setBookingDate("");
      setStartTime("");
      setNotes("");

      setTimeout(() => {
        navigate("/my-appointments");
      }, 1500);
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Unable to create booking.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-600">
            Loading session...
          </p>
        </div>
      </div>
    );
  }

  if (!serviceId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <Link
              to="/experts"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Experts
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-3xl border border-gray-200 p-10">
            <div className="text-5xl mb-5">📅</div>

            <h1 className="text-3xl font-bold text-gray-900">
              Select a session first
            </h1>

            <p className="text-gray-500 mt-3">
              Please choose an expert and session before
              booking an appointment.
            </p>

            <Link
              to="/experts"
              className="inline-block mt-6 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold"
            >
              Find Experts
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Session not found
          </h1>

          <p className="text-gray-500 mt-2">
            This session may no longer be available.
          </p>

          <Link
            to="/experts"
            className="inline-block mt-5 px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold"
          >
            Back to Experts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              FREEWILL
            </h1>

            <p className="text-xs text-gray-500">
              Human Empowerment
            </p>
          </div>

          <Link
            to="/experts"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Experts
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Session Details */}
          <div className="bg-white rounded-3xl border border-gray-200 p-7">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Booking Session
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              {service.title}
            </h2>

            {expert && (
              <div className="mt-5 p-4 rounded-2xl bg-gray-50">
                <p className="text-xs text-gray-500">
                  Expert
                </p>

                <p className="text-lg font-bold text-gray-900 mt-1">
                  {expert.profile?.full_name ||
                    "FREEWILL Expert"}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {expert.specialization ||
                    "Wellness Expert"}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      expert.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {expert.is_active
                      ? "● Available"
                      : "● Unavailable"}
                  </span>

                  {expert.is_verified && (
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      ✓ Verified Expert
                    </span>
                  )}
                </div>
              </div>
            )}

            {service.description && (
              <p className="text-gray-600 mt-6 leading-relaxed">
                {service.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 mt-7">
              <div className="border border-gray-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500">
                  Duration
                </p>

                <p className="text-lg font-bold text-gray-900 mt-1">
                  {service.duration_minutes} minutes
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-4">
                <p className="text-xs text-gray-500">
                  Session Fee
                </p>

                <p className="text-lg font-bold text-gray-900 mt-1">
                  ₹{service.price}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-3xl border border-gray-200 p-7">
            <h2 className="text-2xl font-bold text-gray-900">
              Choose your slot
            </h2>

            <p className="text-gray-500 mt-2">
              Select your preferred date and time.
            </p>

            {error && (
              <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-5 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
                {success}
              </div>
            )}

            <div className="mt-7">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>

              <input
                type="date"
                value={bookingDate}
                min={getToday()}
                onChange={(e) => {
                  setBookingDate(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-gray-900"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-gray-900"
              />

              <p className="text-xs text-gray-400 mt-2">
                Please choose a future time.
              </p>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Anything you'd like the expert to know..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-gray-900 resize-none"
              />
            </div>

            <button
              onClick={handleBooking}
              disabled={booking || (expert ? !expert.is_active : false)}
              className="w-full mt-7 px-5 py-3.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {booking
                ? "Submitting..."
                : "Confirm Appointment"}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Your booking will be submitted for expert
              confirmation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Booking;
