import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type FocusMode = "none" | "email" | "password";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [focusMode, setFocusMode] = useState<FocusMode>("none");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (!data.user) {
        setErrorMessage("Login failed. Please try again.");
        return;
      }

      /*
       * FREEWILL currently sends all successfully
       * authenticated users to the common Home page.
       *
       * Role-based menu/dashboard remains handled
       * inside the Home page.
       */
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020b20] text-white">
      {/* =========================================================
          ANIMATED BACKGROUND
      ========================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        {/* Deep blue atmospheric glow */}
        <div className="absolute left-1/2 top-[8%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="absolute left-[5%] top-[25%] h-[260px] w-[260px] rounded-full bg-cyan-500/10 blur-[90px]" />

        <div className="absolute right-[5%] top-[35%] h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[100px]" />

        {/* Stars */}
        <div className="absolute left-[8%] top-[12%] h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.7)]" />
        <div className="absolute left-[18%] top-[22%] h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]" />
        <div className="absolute left-[30%] top-[7%] h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.7)]" />
        <div className="absolute left-[42%] top-[17%] h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.7)]" />
        <div className="absolute left-[57%] top-[9%] h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.7)]" />
        <div className="absolute left-[72%] top-[19%] h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]" />
        <div className="absolute left-[84%] top-[10%] h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.7)]" />
        <div className="absolute left-[92%] top-[29%] h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]" />

        <div className="absolute left-[12%] top-[42%] h-1 w-1 animate-pulse rounded-full bg-white/80" />
        <div className="absolute left-[26%] top-[35%] h-1 w-1 animate-pulse rounded-full bg-white/70" />
        <div className="absolute left-[68%] top-[38%] h-1 w-1 animate-pulse rounded-full bg-white/80" />
        <div className="absolute left-[89%] top-[47%] h-1 w-1 animate-pulse rounded-full bg-white/70" />

        {/* Shooting stars */}
        <div className="shooting-star shooting-star-one" />
        <div className="shooting-star shooting-star-two" />
        <div className="shooting-star shooting-star-three" />
      </div>

      {/* =========================================================
          TOP NAV
      ========================================================== */}

      <div className="relative z-30 mx-auto flex max-w-6xl px-5 pt-8">
        <Link
          to="/"
          className="group flex items-center gap-2 text-[15px] font-medium text-blue-200 transition hover:text-white"
        >
          <span className="text-xl transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Back to FREEWILL
        </Link>
      </div>

      {/* =========================================================
          MAIN
      ========================================================== */}

      <main className="relative z-20 mx-auto flex min-h-[calc(100vh-70px)] max-w-5xl items-center justify-center px-4 pb-20 pt-14">
        <div className="relative w-full max-w-[720px]">
          {/* =====================================================
              FOX MASCOT
          ====================================================== */}

          <div className="relative z-30 flex justify-center">
            <div
              className={`fox-container ${
                focusMode === "email"
                  ? "fox-email-focus"
                  : focusMode === "password"
                    ? "fox-password-focus"
                    : ""
              }`}
            >
              {/* Glow behind fox */}
              <div className="absolute inset-0 -z-10 rounded-full bg-blue-400/20 blur-3xl" />

              {/* Fox */}
              <div className="fox-mascot">
                <div className="fox-ear fox-ear-left">
                  <div className="fox-ear-inner" />
                </div>

                <div className="fox-ear fox-ear-right">
                  <div className="fox-ear-inner" />
                </div>

                <div className="fox-head">
                  <div className="fox-face-white" />

                  <div className="fox-eye fox-eye-left">
                    <div className="fox-eye-pupil">
                      <div className="fox-eye-light" />
                    </div>
                  </div>

                  <div className="fox-eye fox-eye-right">
                    <div className="fox-eye-pupil">
                      <div className="fox-eye-light" />
                    </div>
                  </div>

                  <div className="fox-cheek fox-cheek-left" />
                  <div className="fox-cheek fox-cheek-right" />

                  <div className="fox-nose" />

                  <div className="fox-mouth">
                    <span />
                    <span />
                  </div>
                </div>

                <div className="fox-body">
                  <div className="fox-paw fox-paw-left">
                    <div className="paw-dot paw-dot-one" />
                    <div className="paw-dot paw-dot-two" />
                    <div className="paw-dot paw-dot-three" />
                    <div className="paw-main" />
                  </div>

                  <div className="fox-paw fox-paw-right">
                    <div className="paw-dot paw-dot-one" />
                    <div className="paw-dot paw-dot-two" />
                    <div className="paw-dot paw-dot-three" />
                    <div className="paw-main" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              LOGIN CARD
          ====================================================== */}

          <section className="relative z-20 -mt-2 rounded-[34px] border border-blue-300/30 bg-[#07152d]/90 px-6 pb-8 pt-14 shadow-[0_0_70px_rgba(36,119,255,0.12)] backdrop-blur-xl sm:px-10 md:px-14">
            {/* Card glow border */}
            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-gradient-to-b from-blue-400/5 via-transparent to-cyan-400/5" />

            <div className="relative">
              {/* =================================================
                  BRAND
              ================================================== */}

              <div className="text-center">
                <div className="text-[17px] font-bold uppercase tracking-[0.42em] text-[#eab34a] sm:text-[20px]">
                  FREEWILL
                </div>

                <div className="mt-2 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#f2c86b] sm:text-xs">
                  <span>•</span>
                  <span>Human Empowerment</span>
                  <span>•</span>
                </div>

                <h1 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Welcome Back
                </h1>

                <p className="mt-3 text-base text-blue-100/70 sm:text-lg">
                  Login to your FREEWILL account
                </p>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleLogin}
                className="mt-10 space-y-6"
              >
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-white sm:text-base"
                  >
                    Email Address
                  </label>

                  <div
                    className={`relative rounded-2xl border transition-all duration-300 ${
                      focusMode === "email"
                        ? "border-blue-400 bg-blue-500/[0.08] shadow-[0_0_25px_rgba(59,130,246,0.18)]"
                        : "border-blue-200/20 bg-white/[0.035]"
                    }`}
                  >
                    {/* Mail icon */}
                    <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-blue-200/70">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <rect
                          x="3"
                          y="5"
                          width="18"
                          height="14"
                          rx="2"
                        />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </div>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusMode("email")}
                      onBlur={() => setFocusMode("none")}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="w-full rounded-2xl bg-transparent py-4 pl-14 pr-5 text-base text-white outline-none placeholder:text-blue-100/45 sm:py-5 sm:text-lg"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-white sm:text-base"
                  >
                    Password
                  </label>

                  <div
                    className={`relative rounded-2xl border transition-all duration-300 ${
                      focusMode === "password"
                        ? "border-blue-400 bg-blue-500/[0.08] shadow-[0_0_25px_rgba(59,130,246,0.18)]"
                        : "border-blue-200/20 bg-white/[0.035]"
                    }`}
                  >
                    {/* Lock icon */}
                    <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-blue-200/70">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <rect
                          x="4"
                          y="10"
                          width="16"
                          height="11"
                          rx="2"
                        />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      </svg>
                    </div>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusMode("password")}
                      onBlur={() => setFocusMode("none")}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-2xl bg-transparent py-4 pl-14 pr-14 text-base text-white outline-none placeholder:text-blue-100/45 sm:py-5 sm:text-lg"
                    />

                    {/* Show / hide */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-200/70 transition hover:text-white"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <path d="M3 3l18 18" />
                          <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                          <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.7 4 10 8-0.5 1.5-1.4 2.9-2.5 4" />
                          <path d="M6.6 6.7C4.8 7.9 3.5 9.7 2 12c1.3 4 5 8 10 8 1.1 0 2.2-.2 3.2-.6" />
                        </svg>
                      ) : (
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                          <circle cx="12" cy="12" r="2.5" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="flex items-center justify-between gap-4">
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-blue-100/70">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      className="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-200/40 bg-transparent checked:border-blue-400 checked:bg-blue-500"
                    />

                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setErrorMessage(
                        "Please use the password reset option configured for your FREEWILL account."
                      )
                    }
                    className="text-sm font-medium text-blue-300 transition hover:text-blue-100"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* ERROR */}
                {errorMessage && (
                  <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-2xl border border-blue-300/40 bg-gradient-to-r from-blue-500 to-blue-700 py-4 text-lg font-bold text-white shadow-[0_0_35px_rgba(37,99,235,0.28)] transition-all duration-300 hover:scale-[1.01] hover:from-blue-400 hover:to-blue-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:py-5 sm:text-xl"
                >
                  <span className="relative z-10">
                    {loading ? "Signing in..." : "Login  →"}
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
              </form>

              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-blue-200/10" />
                <span className="text-sm text-blue-100/45">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-blue-200/10" />
              </div>

              {/* =================================================
                  SOCIAL BUTTONS
              ================================================== */}

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setErrorMessage(
                      "Google sign-in can be connected later through Supabase."
                    )
                  }
                  className="flex items-center justify-center gap-3 rounded-2xl border border-blue-200/15 bg-white/[0.025] px-4 py-3.5 text-base font-semibold text-white transition hover:border-blue-300/30 hover:bg-white/[0.06]"
                >
                  <span className="text-lg font-bold text-white">
                    G
                  </span>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setErrorMessage(
                      "Apple sign-in can be connected later through Supabase."
                    )
                  }
                  className="flex items-center justify-center gap-3 rounded-2xl border border-blue-200/15 bg-white/[0.025] px-4 py-3.5 text-base font-semibold text-white transition hover:border-blue-300/30 hover:bg-white/[0.06]"
                >
                  <span className="text-xl"></span>
                  Apple
                </button>
              </div>

              {/* =================================================
                  REGISTER
              ================================================== */}

              <div className="mt-8 text-center text-base text-blue-100/60">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-300 transition hover:text-white"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* =========================================================
          ANIMATED WAVES
      ========================================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[260px] overflow-hidden">
        <svg
          className="absolute bottom-0 h-full w-[160%] animate-wave-one"
          viewBox="0 0 1600 300"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="waveGradient1"
              x1="0"
              x2="1"
              y1="0"
              y2="0"
            >
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <path
            d="M0 210 C180 120 330 270 520 190 C720 105 850 280 1040 190 C1230 100 1390 245 1600 160 L1600 300 L0 300 Z"
            fill="url(#waveGradient1)"
          />

          <path
            d="M0 210 C180 120 330 270 520 190 C720 105 850 280 1040 190 C1230 100 1390 245 1600 160"
            fill="none"
            stroke="#38bdf8"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
        </svg>

        <svg
          className="absolute bottom-[-35px] h-full w-[160%] animate-wave-two"
          viewBox="0 0 1600 300"
          preserveAspectRatio="none"
        >
          <path
            d="M0 220 C220 300 360 125 580 205 C790 280 940 120 1130 205 C1320 285 1460 150 1600 200 L1600 300 L0 300 Z"
            fill="none"
            stroke="#60a5fa"
            strokeOpacity="0.25"
            strokeWidth="2"
          />

          <path
            d="M0 245 C200 155 390 285 610 205 C830 125 1010 270 1210 195 C1370 135 1490 225 1600 180"
            fill="none"
            stroke="#22d3ee"
            strokeOpacity="0.22"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* =========================================================
          STYLES
      ========================================================== */}

      <style>{`
        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 999px;
          box-shadow:
            0 0 8px 2px rgba(255,255,255,0.9),
            -90px 35px 25px 1px rgba(96,165,250,0.15);
          opacity: 0;
          transform: rotate(-35deg);
        }

        .shooting-star-one {
          top: 17%;
          left: 17%;
          animation: shootingStar 7s linear infinite;
        }

        .shooting-star-two {
          top: 25%;
          left: 73%;
          animation: shootingStar 9s linear 2.5s infinite;
        }

        .shooting-star-three {
          top: 8%;
          left: 52%;
          animation: shootingStar 11s linear 5s infinite;
        }

        @keyframes shootingStar {
          0% {
            opacity: 0;
            transform: translate(0,0) rotate(-35deg);
          }

          5% {
            opacity: 1;
          }

          18% {
            opacity: 0;
            transform: translate(-170px,100px) rotate(-35deg);
          }

          100% {
            opacity: 0;
          }
        }

        .fox-container {
          position: relative;
          width: 190px;
          height: 190px;
          transition:
            transform 500ms cubic-bezier(.2,.8,.2,1),
            filter 500ms ease;
          animation: foxFloat 4s ease-in-out infinite;
        }

        .fox-container.fox-email-focus {
          transform: translateY(7px) scale(0.98);
          filter: brightness(1.05);
        }

        .fox-container.fox-password-focus {
          transform: translateY(8px) scale(0.98);
        }

        .fox-container.fox-password-focus .fox-eye {
          transform: scaleY(0.15);
        }

        @keyframes foxFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        .fox-mascot {
          position: absolute;
          left: 50%;
          top: 0;
          width: 175px;
          height: 175px;
          transform: translateX(-50%);
        }

        .fox-head {
          position: absolute;
          left: 23px;
          top: 24px;
          width: 129px;
          height: 118px;
          border-radius: 48% 48% 45% 45%;
          background:
            radial-gradient(circle at 50% 25%, #ff9d52 0 10%, transparent 11%),
            linear-gradient(145deg, #ff8b3d, #e85b20 75%);
          box-shadow:
            inset -10px -10px 18px rgba(115,31,8,0.22),
            0 15px 30px rgba(0,0,0,0.28);
          z-index: 3;
        }

        .fox-ear {
          position: absolute;
          top: 3px;
          width: 54px;
          height: 68px;
          background: linear-gradient(145deg, #ff9144, #dc4e1c);
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
          z-index: 2;
        }

        .fox-ear-left {
          left: 23px;
          transform: rotate(-9deg);
        }

        .fox-ear-right {
          right: 23px;
          transform: rotate(9deg);
        }

        .fox-ear-inner {
          position: absolute;
          left: 50%;
          top: 13px;
          width: 24px;
          height: 36px;
          transform: translateX(-50%);
          background: #ffd7c5;
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }

        .fox-face-white {
          position: absolute;
          left: 22px;
          bottom: 7px;
          width: 85px;
          height: 69px;
          border-radius: 50% 50% 48% 48%;
          background: linear-gradient(180deg, #fffaf7, #f2e9e5);
        }

        .fox-eye {
          position: absolute;
          top: 45px;
          width: 25px;
          height: 29px;
          border-radius: 50%;
          background: #eaf5ff;
          transition: transform 350ms ease;
          overflow: hidden;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.2);
        }

        .fox-eye-left {
          left: 31px;
        }

        .fox-eye-right {
          right: 31px;
        }

        .fox-eye-pupil {
          position: absolute;
          left: 5px;
          top: 4px;
          width: 16px;
          height: 20px;
          border-radius: 50%;
          background: #153c70;
        }

        .fox-eye-light {
          position: absolute;
          left: 4px;
          top: 3px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: white;
        }

        .fox-cheek {
          position: absolute;
          bottom: 30px;
          width: 18px;
          height: 10px;
          border-radius: 50%;
          background: #ffb39a;
        }

        .fox-cheek-left {
          left: 21px;
        }

        .fox-cheek-right {
          right: 21px;
        }

        .fox-nose {
          position: absolute;
          left: 50%;
          bottom: 34px;
          width: 19px;
          height: 14px;
          transform: translateX(-50%);
          border-radius: 50% 50% 55% 55%;
          background: #18202b;
        }

        .fox-mouth {
          position: absolute;
          left: 50%;
          bottom: 22px;
          width: 38px;
          height: 15px;
          transform: translateX(-50%);
        }

        .fox-mouth span {
          position: absolute;
          top: 0;
          width: 19px;
          height: 11px;
          border-bottom: 2px solid #242c35;
        }

        .fox-mouth span:first-child {
          left: 0;
          border-radius: 0 0 0 14px;
          transform: rotate(7deg);
        }

        .fox-mouth span:last-child {
          right: 0;
          border-radius: 0 0 14px 0;
          transform: rotate(-7deg);
        }

        .fox-body {
          position: absolute;
          left: 39px;
          bottom: 1px;
          width: 98px;
          height: 60px;
          border-radius: 50% 50% 40% 40%;
          background: linear-gradient(145deg, #ff8740, #c94819);
          box-shadow: inset -8px -10px 15px rgba(90,20,4,0.2);
          z-index: 1;
        }

        .fox-paw {
          position: absolute;
          top: 8px;
          width: 47px;
          height: 43px;
          border-radius: 50%;
          background: linear-gradient(145deg, #7f4b3a, #493029);
          border: 2px solid rgba(255,255,255,0.1);
        }

        .fox-paw-left {
          left: -5px;
        }

        .fox-paw-right {
          right: -5px;
        }

        .paw-dot {
          position: absolute;
          border-radius: 50%;
          background: #e7d9d2;
        }

        .paw-dot-one {
          left: 10px;
          top: 7px;
          width: 8px;
          height: 8px;
        }

        .paw-dot-two {
          left: 21px;
          top: 5px;
          width: 8px;
          height: 8px;
        }

        .paw-dot-three {
          right: 8px;
          top: 9px;
          width: 8px;
          height: 8px;
        }

        .paw-main {
          position: absolute;
          left: 50%;
          bottom: 6px;
          width: 22px;
          height: 17px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: #d9c9c2;
        }

        .animate-wave-one {
          animation: waveMoveOne 13s ease-in-out infinite alternate;
        }

        .animate-wave-two {
          animation: waveMoveTwo 17s ease-in-out infinite alternate;
        }

        @keyframes waveMoveOne {
          0% {
            transform: translateX(0) translateY(4px);
          }

          100% {
            transform: translateX(-15%) translateY(-8px);
          }
        }

        @keyframes waveMoveTwo {
          0% {
            transform: translateX(-10%);
          }

          100% {
            transform: translateX(5%);
          }
        }

        @media (max-width: 640px) {
          .fox-container {
            width: 155px;
            height: 155px;
          }

          .fox-mascot {
            transform: translateX(-50%) scale(0.84);
            transform-origin: top center;
          }

          .fox-container.fox-email-focus {
            transform: translateY(5px) scale(0.96);
          }

          .fox-container.fox-password-focus {
            transform: translateY(6px) scale(0.96);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shooting-star,
          .fox-container,
          .animate-wave-one,
          .animate-wave-two {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
