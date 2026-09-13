import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /*
   * Normal Login:
   * /login
   *      ↓
   * FREEWILL Healing Animation
   *      ↓
   * /home
   *
   * Booking Login:
   * /login?redirect=/booking?service=XXXX
   *      ↓
   * FREEWILL Healing Animation
   *      ↓
   * /booking?service=XXXX
   */

  const redirectPath = searchParams.get("redirect");

  const goTo = (path: string) => {
    setTransitioning(true);

    setTimeout(() => {
      navigate(path, { replace: true });
    }, 1500);
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      alert(
        "Please enter your email and password."
      );
      return;
    }

    setLoading(true);

    try {
      const {
        data,
        error,
      } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        console.error(
          "Login error:",
          error
        );

        alert(error.message);

        setLoading(false);

        return;
      }

      if (!data.user || !data.session) {
        alert(
          "Login failed. Please try again."
        );

        setLoading(false);

        return;
      }

      /*
       * IMPORTANT:
       *
       * If Login came from Booking,
       * return to the SAME Booking page.
       *
       * Otherwise go to Home.
       */

      let destination = "/home";

      if (
        redirectPath &&
        redirectPath.startsWith("/")
      ) {
        destination = redirectPath;
      }

      setLoading(false);

      goTo(destination);
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  const handleForgotPassword =
    async () => {
      const cleanEmail = email.trim();

      if (!cleanEmail) {
        alert(
          "Please enter your email first."
        );

        return;
      }

      try {
        const { error } =
          await supabase.auth.resetPasswordForEmail(
            cleanEmail,
            {
              redirectTo: `${window.location.origin}/login`,
            }
          );

        if (error) {
          alert(error.message);
        } else {
          alert(
            "Password reset link has been sent to your email."
          );
        }
      } catch (error) {
        console.error(
          "Password reset error:",
          error
        );

        alert(
          "Something went wrong. Please try again."
        );
      }
    };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617] text-white flex items-center justify-center px-5 py-10">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Main cyan healing glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Blue healing glow */}
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

        {/* Center purple glow */}
        <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[100px]" />

        {/* Stars */}
        <div className="absolute inset-0 opacity-20">

          {Array.from({
            length: 35,
          }).map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${(i * 29) % 100}%`,
                top: `${(i * 47) % 100}%`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}

        </div>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="relative z-10 w-full max-w-md">

        {/* ================= BRAND ================= */}

        <div className="text-center mb-8">

          <Link
            to="/home"
            className="inline-block text-3xl font-black tracking-[0.25em] text-white"
          >
            FREEWILL
          </Link>

          <p className="mt-2 text-xs tracking-[0.3em] text-cyan-300 uppercase">
            Human Empowerment
          </p>

          <p className="mt-5 text-gray-400 text-sm">
            Welcome back. Continue your journey.
          </p>

        </div>

        {/* ================= CARD ================= */}

        <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-2xl p-7 sm:p-9">

          <div className="mb-7">

            <h1 className="text-2xl font-bold">
              Welcome Back
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Sign in to your FREEWILL account
            </p>

          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10 transition"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 pr-14 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (v) => !v
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

            {/* FORGOT PASSWORD */}

            <div className="text-right">

              <button
                type="button"
                onClick={
                  handleForgotPassword
                }
                className="text-sm text-cyan-300 hover:text-cyan-200"
              >
                Forgot password?
              </button>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={
                loading ||
                transitioning
              }
              className="w-full rounded-xl py-3.5 font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg shadow-cyan-500/10"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

          {/* ================= REGISTER ================= */}

          <div className="mt-7 text-center text-sm text-gray-400">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-cyan-300 hover:text-cyan-200 font-semibold"
            >
              Sign Up
            </Link>

          </div>

          {/* ================= HOME ================= */}

          <div className="mt-5 text-center">

            <Link
              to="/home"
              className="text-xs text-gray-500 hover:text-gray-300 transition"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

        {/* ================= FOOTER ================= */}

        <p className="text-center text-xs text-gray-600 mt-6">
          Your journey. Your mind. Your FREEWILL.
        </p>

      </div>

      {/* ================================================= */}
      {/*             FREEWILL HEALING TRANSITION          */}
      {/* ================================================= */}

      {transitioning && (
        <div className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center overflow-hidden">

          {/* ================= HEALING BACKGROUND ================= */}

          <div className="absolute inset-0 pointer-events-none">

            {/* Large breathing glow */}
            <div className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[70px] animate-[healingGlow_3s_ease-in-out_infinite]" />

            {/* Outer healing rings */}

            <div className="absolute top-1/2 left-1/2 w-[120px] h-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 animate-[healingRing_3s_ease-out_infinite]" />

            <div
              className="absolute top-1/2 left-1/2 w-[120px] h-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/15 animate-[healingRing_3s_ease-out_infinite]"
              style={{
                animationDelay: "1s",
              }}
            />

            <div
              className="absolute top-1/2 left-1/2 w-[120px] h-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/10 animate-[healingRing_3s_ease-out_infinite]"
              style={{
                animationDelay: "2s",
              }}
            />

            {/* Small floating lights */}

            <div
              className="absolute top-[35%] left-[35%] w-2 h-2 rounded-full bg-cyan-300/50 blur-[1px] animate-[floatingLight_3s_ease-in-out_infinite]"
            />

            <div
              className="absolute top-[60%] left-[65%] w-1.5 h-1.5 rounded-full bg-blue-300/50 blur-[1px] animate-[floatingLight_4s_ease-in-out_infinite]"
              style={{
                animationDelay: "1s",
              }}
            />

            <div
              className="absolute top-[42%] left-[68%] w-1 h-1 rounded-full bg-cyan-200/50 blur-[1px] animate-[floatingLight_3.5s_ease-in-out_infinite]"
              style={{
                animationDelay: "0.5s",
              }}
            />

            <div
              className="absolute top-[65%] left-[32%] w-1.5 h-1.5 rounded-full bg-purple-300/40 blur-[1px] animate-[floatingLight_4s_ease-in-out_infinite]"
              style={{
                animationDelay: "1.5s",
              }}
            />

          </div>

          {/* ================= CENTER ================= */}

          <div className="relative z-10 text-center">

            {/* Logo / Wordmark */}

            <div className="relative">

              {/* Glow behind text */}

              <div className="absolute inset-0 flex items-center justify-center">

                <div className="w-40 h-20 rounded-full bg-cyan-400/10 blur-3xl animate-[healingGlow_3s_ease-in-out_infinite]" />

              </div>

              <div
                className="relative text-4xl sm:text-5xl font-black tracking-[0.32em] text-white animate-[healingText_3s_ease-in-out_infinite]"
              >
                FREEWILL
              </div>

            </div>

            {/* Healing symbol */}

            <div className="mt-7 flex justify-center items-center">

              <div className="relative w-12 h-12 flex items-center justify-center">

                <div className="absolute inset-0 rounded-full border border-cyan-300/30 animate-spin [animation-duration:5s]" />

                <div className="absolute inset-2 rounded-full border border-blue-300/20 animate-spin [animation-duration:3s] [animation-direction:reverse]" />

                <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,0.9)] animate-pulse" />

              </div>

            </div>

            {/* Message */}

            <p className="mt-6 text-sm text-gray-400 tracking-wide animate-pulse">
              {redirectPath
                ? "Returning to your space..."
                : "Entering your space..."}
            </p>

          </div>

          {/* ================= CUSTOM ANIMATION STYLES ================= */}

          <style>
            {`
              @keyframes healingGlow {
                0% {
                  transform: translate(-50%, -50%) scale(0.75);
                  opacity: 0.25;
                }

                50% {
                  transform: translate(-50%, -50%) scale(1.25);
                  opacity: 0.7;
                }

                100% {
                  transform: translate(-50%, -50%) scale(0.75);
                  opacity: 0.25;
                }
              }

              @keyframes healingRing {
                0% {
                  transform: translate(-50%, -50%) scale(0.6);
                  opacity: 0;
                }

                20% {
                  opacity: 0.8;
                }

                100% {
                  transform: translate(-50%, -50%) scale(3.5);
                  opacity: 0;
                }
              }

              @keyframes healingText {
                0% {
                  opacity: 0.45;
                  transform: scale(0.94);
                  filter: blur(1px);
                }

                50% {
                  opacity: 1;
                  transform: scale(1.04);
                  filter: blur(0);
                  text-shadow:
                    0 0 10px rgba(103, 232, 249, 0.35),
                    0 0 30px rgba(59, 130, 246, 0.2);
                }

                100% {
                  opacity: 0.45;
                  transform: scale(0.94);
                  filter: blur(1px);
                }
              }

              @keyframes floatingLight {
                0% {
                  transform: translateY(10px);
                  opacity: 0.15;
                }

                50% {
                  transform: translateY(-25px);
                  opacity: 0.8;
                }

                100% {
                  transform: translateY(10px);
                  opacity: 0.15;
                }
              }
            `}
          </style>

        </div>
      )}

    </div>
  );
}
