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
  services: {
    title: string;
    description: string | null;
    duration_minutes: number;
    price: number;
  } | null;
};

type RazorpayResponse = {
  success: boolean;
  order: {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
  };
  key_id: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

function MyAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payingId, setPayingId] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState("");

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

      const formattedAppointments: Appointment[] = (data || []).map(
        (item: any) => ({
          id: item.id,
          booking_date: item.booking_date,
          start_time: item.start_time,
          status: item.status,
          notes: item.notes,
          created_at: item.created_at,
          services: Array.isArray(item.services)
            ? item.services[0] || null
            : item.services || null,
        })
      );

      setAppointments(formattedAppointments);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(true));
        existingScript.addEventListener("error", () => resolve(false));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async (appointment: Appointment) => {
    try {
      setError("");
      setPaymentMessage("");
      setPayingId(appointment.id);

      if (!appointment.services) {
        setError("Session information is unavailable.");
        setPayingId(null);
        return;
      }

      const amount = Number(appointment.services.price);

      if (!amount || amount < 10) {
        setError("Invalid session amount.");
        setPayingId(null);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        setError(
          "Unable to load Razorpay Checkout. Please check your internet connection and try again."
        );
        setPayingId(null);
        return;
      }

      /*
       * STEP 1
       * Create Razorpay order using Supabase Edge Function.
       */
      const { data, error: functionError } =
        await supabase.functions.invoke("create-razorpay-order", {
          body: {
            amount,
            receipt: `freewill_${appointment.id}`,
          },
        });

      if (functionError) {
        console.error("Razorpay function error:", functionError);
        setError(
          functionError.message ||
            "Unable to create payment order."
        );
        setPayingId(null);
        return;
      }

      const razorpayData = data as RazorpayResponse;

      if (!razorpayData?.success || !razorpayData?.order?.id) {
        setError("Unable to create Razorpay order.");
        setPayingId(null);
        return;
      }

      /*
       * STEP 2
       * Open Razorpay Checkout.
       */
      const options = {
        key: razorpayData.key_id,
        amount: razorpayData.order.amount,
        currency: razorpayData.order.currency,
        name: "FREEWILL",
        description: appointment.services.title,
        order_id: razorpayData.order.id,

        prefill: {
          name: "",
          email: "",
        },

        theme: {
          color: "#111827",
        },

        /*
         * STEP 3
         * Razorpay payment successful.
         *
         * IMPORTANT:
         * Do NOT mark payment as successful only on frontend.
         * Send Razorpay response to secure Supabase Edge Function.
         */
        handler: async function (response: any) {
          try {
            setPaymentMessage("");
            setError("");

            /*
             * STEP 4
             * Verify Razorpay signature on server.
             */
            const {
              data: verificationData,
              error: verificationError,
            } = await supabase.functions.invoke(
              "verify-razorpay-payment",
              {
                body: {
                  booking_id: appointment.id,
                  razorpay_order_id:
                    response.razorpay_order_id,
                  razorpay_payment_id:
                    response.razorpay_payment_id,
                  razorpay_signature:
                    response.razorpay_signature,
                },
              }
            );

            if (verificationError) {
              console.error(
                "Payment verification error:",
                verificationError
              );

              setError(
                verificationError.message ||
                  "Payment verification failed. Please contact FREEWILL support."
              );

              setPayingId(null);
              return;
            }

            if (!verificationData?.success) {
              console.error(
                "Payment verification failed:",
                verificationData
              );

              setError(
                verificationData?.error ||
                  "Payment verification failed."
              );

              setPayingId(null);
              return;
            }

            /*
             * STEP 5
             * Payment verified + saved in Supabase.
             */
            setPaymentMessage(
              "Payment completed and verified successfully. Your payment has been recorded."
            );

            setPayingId(null);

            /*
             * Reload appointments so latest booking/payment state
             * is reflected.
             */
            await loadAppointments();
          } catch (error) {
            console.error(
              "Payment verification exception:",
              error
            );

            setError(
              "Payment was received, but verification could not be completed. Please contact FREEWILL support."
            );

            setPayingId(null);
          }
        },

        modal: {
          ondismiss: function () {
            setPayingId(null);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response: any) {
          console.error("Payment failed:", response);

          setError(
            response?.error?.description ||
              "Payment failed. Please try again."
          );

          setPayingId(null);
        }
      );

      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      setError("Unable to start payment. Please try again.");
      setPayingId(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
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

      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Appointments
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your counseling appointments
            </p>
          </div>

          <Link
            to="/home"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-4"></div>

            <p className="text-gray-600">
              Loading your appointments...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center mb-6">
            <div className="text-4xl mb-4">⚠️</div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>

            <p className="text-gray-600 mb-5">
              {error}
            </p>

            <button
              onClick={loadAppointments}
              className="px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Payment Message */}
        {!loading && paymentMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 text-sm">
            ✅ {paymentMessage}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && appointments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
            <div className="text-5xl mb-4">📅</div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No appointments yet
            </h2>

            <p className="text-gray-500 mb-6">
              You haven't booked any counseling appointments yet.
            </p>

            <Link
              to="/booking"
              className="inline-block px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
            >
              Book an Appointment
            </Link>
          </div>
        )}

        {/* Appointments */}
        {!loading && !error && appointments.length > 0 && (
          <div className="space-y-5">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                  {/* Appointment Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {appointment.services?.title ||
                          "Counseling Appointment"}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    {appointment.services?.description && (
                      <p className="text-gray-600 mb-4">
                        {appointment.services.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Date */}
                      <div className="flex items-start gap-3">
                        <div className="text-xl">📅</div>

                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Date
                          </p>

                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {formatDate(
                              appointment.booking_date
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex items-start gap-3">
                        <div className="text-xl">⏰</div>

                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Time
                          </p>

                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {formatTime(
                              appointment.start_time
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Duration */}
                      {appointment.services && (
                        <div className="flex items-start gap-3">
                          <div className="text-xl">⌛</div>

                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Duration
                            </p>

                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {
                                appointment.services
                                  .duration_minutes
                              }{" "}
                              minutes
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {appointment.notes && (
                      <div className="mt-5 p-4 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          Notes
                        </p>

                        <p className="text-sm text-gray-700">
                          {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Price + Payment */}
                  {appointment.services && (
                    <div className="md:text-right min-w-[160px]">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Price
                      </p>

                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        ₹{appointment.services.price}
                      </p>

                      {/* Pay Now only after expert confirms */}
                      {appointment.status.toLowerCase() ===
                        "confirmed" && (
                        <button
                          onClick={() =>
                            handlePayment(appointment)
                          }
                          disabled={
                            payingId === appointment.id
                          }
                          className="w-full md:w-auto mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          {payingId === appointment.id
                            ? "Processing Payment..."
                            : `Pay ₹${appointment.services.price}`}
                        </button>
                      )}

                      {appointment.status.toLowerCase() ===
                        "pending" && (
                        <p className="text-xs text-yellow-600 mt-3">
                          Waiting for expert confirmation
                        </p>
                      )}

                      {appointment.status.toLowerCase() ===
                        "completed" && (
                        <p className="text-xs text-blue-600 mt-3">
                          Session completed
                        </p>
                      )}

                      {(appointment.status.toLowerCase() ===
                        "cancelled" ||
                        appointment.status.toLowerCase() ===
                          "canceled") && (
                        <p className="text-xs text-red-600 mt-3">
                          Appointment cancelled
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Book Another */}
        {!loading && !error && appointments.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/booking"
              className="inline-block px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
            >
              + Book Another Appointment
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyAppointments;
