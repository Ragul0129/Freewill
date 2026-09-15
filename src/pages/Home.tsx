import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import bossImage from "../assets/boss.png";
import jeevithaImage from "../assets/jeevitha.png";
import rahulImage from "../assets/rahul.png";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type UserRole = "user" | "expert" | "admin" | null;

function Home() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!mounted) return;

        if (!user) {
          setUserEmail("");
          setUserRole(null);
          setCheckingAuth(false);
          return;
        }

        setUserEmail(user.email || "");

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (!mounted) return;

        setUserRole((profile?.role as UserRole) || "user");
      } catch (error) {
        console.error("Home auth error:", error);

        if (mounted) {
          setUserEmail("");
          setUserRole(null);
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      if (!session?.user) {
        setUserEmail("");
        setUserRole(null);
        setCheckingAuth(false);
        return;
      }

      setUserEmail(session.user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!mounted) return;

      setUserRole((profile?.role as UserRole) || "user");
      setCheckingAuth(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);

    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUserEmail("");
    setUserRole(null);
    navigate("/home", { replace: true });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const roleLabel =
    userRole === "expert"
      ? "Expert Account"
      : userRole === "admin"
      ? "Administrator"
      : "FREEWILL User";

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#173d3a]">

      {/* ================= NAVBAR ================= */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">

            <Link
              to="/home"
              className="text-2xl md:text-3xl font-black tracking-wide text-white"
            >
              FREEWILL
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
              <Link
                to="/home"
                className="hover:text-[#e9ad3d] transition"
              >
                Home
              </Link>

              <a
                href="#about"
                className="hover:text-[#e9ad3d] transition"
              >
                About
              </a>

              <a
                href="#experts"
                className="hover:text-[#e9ad3d] transition"
              >
                Experts
              </a>

              <a
                href="#services"
                className="hover:text-[#e9ad3d] transition"
              >
                Services
              </a>

              <a
                href="#process"
                className="hover:text-[#e9ad3d] transition"
              >
                How It Works
              </a>

              <Link
                to="/booking"
                className="hover:text-[#e9ad3d] transition"
              >
                Appointment
              </Link>
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">

              {/* SIGN IN / LOGOUT */}
              {!checkingAuth && !userEmail && (
                <Link
                  to="/login"
                  className="rounded-full bg-[#e8a83b] px-5 sm:px-6 py-3 text-sm font-bold text-[#173d3a] shadow-lg hover:bg-[#f2bd58] transition"
                >
                  Sign In
                </Link>
              )}

              {!checkingAuth && userEmail && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-[#e8a83b] px-5 sm:px-6 py-3 text-sm font-bold text-[#173d3a] shadow-lg hover:bg-[#f2bd58] transition"
                >
                  Logout
                </button>
              )}

              {/* MENU */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Open menu"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition"
                >
                  <div className="space-y-1.5">
                    <span className="block h-0.5 w-6 bg-white" />
                    <span className="block h-0.5 w-6 bg-white" />
                    <span className="block h-0.5 w-6 bg-white" />
                  </div>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

                    {/* MENU HEADER */}
                    <div className="border-b border-gray-100 bg-[#f7f4ed] px-5 py-4">
                      {userEmail ? (
                        <>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                            {roleLabel}
                          </p>

                          <p className="mt-1 truncate text-sm font-semibold text-[#173d3a]">
                            {userEmail}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                            FREEWILL
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#173d3a]">
                            Human Empowerment
                          </p>
                        </>
                      )}
                    </div>

                    {/* ================= NORMAL PUBLIC MENU ================= */}

                    {!userEmail && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-4 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-lg">📊</span>
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/my-appointments"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-lg">📅</span>
                          <span>My Appointments</span>
                        </Link>
                      </>
                    )}

                    {/* ================= USER MENU ================= */}

                    {userEmail && userRole === "user" && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-4 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-lg">📊</span>
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/my-appointments"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-lg">📅</span>
                          <span>My Appointments</span>
                        </Link>
                      </>
                    )}

                    {/* ================= EXPERT MENU ================= */}

                    {userEmail && userRole === "expert" && (
                      <>
                        <Link
                          to="/expert-dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-4 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-lg">📊</span>
                          <span>Expert Dashboard</span>
                        </Link>

                        <Link
                          to="/expert-profile"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-lg">👤</span>
                          <span>My Profile</span>
                        </Link>

                        <Link
                          to="/expert-services"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-lg">🛠️</span>
                          <span>My Services</span>
                        </Link>
                      </>
                    )}

                    {/* ================= ADMIN MENU ================= */}

                    {userEmail && userRole === "admin" && (
                      <Link
                        to="/admin-dashboard"
                        onClick={closeMenu}
                        className="flex items-center gap-4 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                      >
                        <span className="text-lg">🛡️</span>
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    {/* ================= WHATSAPP ================= */}

                    <a
                      href="https://wa.me/919841624060"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                    >
                      <span className="text-lg">🟢</span>
                      <span>WhatsApp</span>
                    </a>

                    {/* ================= INSTAGRAM ================= */}

                    <a
                      href="https://www.instagram.com/simonanandhraj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                    >
                      <span className="text-lg">📸</span>
                      <span>Instagram</span>
                    </a>

                    {/* ================= LOGOUT ================= */}

                    {userEmail && (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 border-t border-gray-100 px-5 py-4 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                      >
                        <span className="text-lg">🚪</span>
                        <span>Logout</span>
                      </button>
                    )}

                    {/* ================= SIGN IN ================= */}

                    {!userEmail && (
                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                      >
                        <span className="text-lg">🔐</span>
                        <span>Sign In</span>
                      </Link>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative min-h-[720px] overflow-hidden bg-[#0d4743] text-white">

        <div className="absolute -right-32 top-20 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="absolute -right-20 top-32 h-[400px] w-[400px] rounded-full bg-[#185c56]/60 blur-2xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#083b38]/70 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 md:pt-40">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10">

            <div className="max-w-2xl">

              <div className="mb-6 flex items-center gap-3">
                <span className="text-[#eab34a] text-lg tracking-widest">
                  ★★★★★
                </span>
                <span className="text-sm text-white/70">
                  Human Empowerment
                </span>
              </div>

              <p className="mb-5 text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#eab34a]">
                FREEWILL – Human Empowerment
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.04]">
                Understand Your Mind.
                <br />
                <span className="text-[#eab34a]">
                  Transform Your Life.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base md:text-lg leading-8 text-white/75">
                World's First Psycho-Spiritual and Quantum Philosophical
                Training Firm — empowering individuals to understand
                themselves, discover their potential and create meaningful
                transformation.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/assessment"
                  className="rounded-full bg-[#e8a83b] px-7 py-4 font-bold text-[#173d3a] shadow-xl hover:bg-[#f2bd58] transition"
                >
                  Take Assessment →
                </Link>

                <Link
                  to="/booking"
                  className="rounded-full border border-white/30 px-7 py-4 font-semibold text-white hover:bg-white/10 transition"
                >
                  Book Appointment
                </Link>
              </div>

              <div className="mt-12 flex gap-8">
                <div>
                  <p className="text-2xl font-black text-[#eab34a]">
                    100%
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Confidential
                  </p>
                </div>

                <div className="border-l border-white/20 pl-8">
                  <p className="text-2xl font-black text-[#eab34a]">
                    360°
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Holistic Approach
                  </p>
                </div>

                <div className="border-l border-white/20 pl-8">
                  <p className="text-2xl font-black text-[#eab34a]">
                    24/7
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Online Access
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">

              <div className="absolute h-[390px] w-[390px] md:h-[500px] md:w-[500px] rounded-full bg-[#185d57] opacity-80" />

              <div className="absolute h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full border border-[#eab34a]/20" />

              <img
                src={bossImage}
                alt="FREEWILL Human Empowerment"
                className="relative z-10 max-h-[570px] w-full max-w-[520px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
              />

              <div className="absolute bottom-6 left-0 z-20 max-w-[260px] rounded-2xl border border-white/10 bg-[#083b38]/95 p-5 shadow-2xl backdrop-blur">
                <p className="text-3xl font-serif text-[#eab34a]">
                  “
                </p>

                <p className="text-sm font-semibold leading-6 text-white">
                  Your journey towards self-understanding starts here.
                </p>

                <p className="mt-2 text-xs text-white/50">
                  FREEWILL Human Empowerment
                </p>
              </div>

            </div>
          </div>
        </div>

        <div className="absolute bottom-[-1px] left-0 right-0">
          <svg
            viewBox="0 0 1440 130"
            className="h-[90px] w-full md:h-[120px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#f7f4ed"
              d="M0 55 C180 115 300 100 450 75 C580 53 650 125 760 125 C900 125 930 53 1060 75 C1190 100 1280 115 1440 55 L1440 130 L0 130 Z"
            />
          </svg>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="bg-[#f7f4ed] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
                About FREEWILL
              </p>

              <h2 className="mt-4 text-3xl md:text-5xl font-black leading-tight">
                A deeper approach to
                <br />
                <span className="text-[#c88d22]">
                  human empowerment.
                </span>
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                FREEWILL is focused on helping individuals explore their
                inner world, understand their wellbeing and move towards
                meaningful personal growth.
