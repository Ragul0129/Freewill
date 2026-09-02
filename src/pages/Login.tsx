import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      if (!data.user) {
        setError("Login failed. Please try again.");
        return;
      }

      // Successful login → FREEWILL Home page
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ed] px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-md">

        <div className="mb-6 text-center">
          <Link
            to="/"
            className="text-sm font-bold text-[#0d4743] hover:text-[#c88d22]"
          >
            ← Back to FREEWILL
          </Link>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-xl md:p-10">

          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              FREEWILL • HUMAN EMPOWERMENT
            </p>

            <h1 className="mt-4 text-3xl font-black text-[#173d3a]">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-600">
              Login to your FREEWILL account
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-bold text-[#173d3a]">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-[#0d4743]"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#173d3a]">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-[#0d4743]"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-full px-6 py-4 font-bold text-white shadow-lg transition ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[#0d4743] hover:bg-[#12554f]"
              }`}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>

          </form>

          <div className="mt-7 border-t border-gray-100 pt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-bold text-[#0d4743] hover:text-[#c88d22] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
