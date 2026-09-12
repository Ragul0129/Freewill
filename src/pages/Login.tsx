import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const goToHome = () => {
    setTransitioning(true);

    setTimeout(() => {
      navigate("/home", { replace: true });
    }, 700);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (error) {
        console.error("Login error:", error);
        alert(error.message);
        setLoading(false);
        return;
      }

      if (!data.user || !data.session) {
        alert("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      /*
       * Login successful.
       *
       * IMPORTANT:
       * We intentionally DO NOT redirect based on role.
       *
       * User / Expert / Admin
       *        ↓
       *      HOME
       *
       * The Home page reads the logged-in user's role
       * and shows the correct dashboard options inside
       * the 3-line menu.
       */

      setLoading(false);
      goToHome();

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      alert("Please enter your email first.");
      return;
    }

    try {
      const { error } =
        await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: `${window.location.origin}/login`,
        });

      if (error) {
        alert(error.message);
      } else {
        alert("Password reset link has been sent to your email.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden bg-[#020617] text-white flex items-center justify-center px-5 py-10 ${
        transitioning
          ? "opacity-0 scale-[1.02]"
          : "opacity-100"
      } transition-all duration-700`}
    >

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[100px]" />

        <div className="absolute inset-0 opacity-20">

          {Array.from({ length: 35 }).map((_, i) => (
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

        {/* BRAND */}

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

        {/* CARD */}

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
                onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 pr-14 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((v) => !v)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>

            {/* FORGOT PASSWORD */}

            <div className="text-right">

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-cyan-300 hover:text-cyan-200"
              >
                Forgot password?
              </button>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading || transitioning}
              className="w-full rounded-xl py-3.5 font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg shadow-cyan-500/10"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

          {/* REGISTER */}

          <div className="mt-7 text-center text-sm text-gray-400">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-cyan-300 hover:text-cyan-200 font-semibold"
            >
              Sign Up
            </Link>

          </div>

          {/* HOME */}

          <div className="mt-5 text-center">

            <Link
              to="/home"
              className="text-xs text-gray-500 hover:text-gray-300 transition"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

        {/* FOOTER TEXT */}

        <p className="text-center text-xs text-gray-600 mt-6">
          Your journey. Your mind. Your FREEWILL.
        </p>

      </div>

      {/* ================= TRANSITION ================= */}

      {transitioning && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex items-center justify-center">

          <div className="text-center">

            <div className="text-3xl font-black tracking-[0.3em]">
              FREEWILL
            </div>

            <div className="mt-4 flex justify-center gap-2">

              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />

              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:150ms]" />

              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:300ms]" />

            </div>

            <p className="mt-4 text-sm text-gray-400">
              Entering your space...
            </p>

          </div>

        </div>
      )}

    </div>
  );
}
