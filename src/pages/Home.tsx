import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import bossImage from "../assets/boss.png";
import jeevithaImage from "../assets/jeevitha.png";
import rahulImage from "../assets/rahul.png";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type UserRole = "user" | "expert" | "admin";

type Expert = {
  image: string;
  experience: string;
  role: string;
  name: string;
  title: string;
  description: string;
  services: [string, string][];
  note: string;
  button: string;
  light: boolean;
};

function Home() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<UserRole>("user");
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!mounted) return;

        if (user) {
          setUserEmail(user.email || "");

          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .maybeSingle();

          if (!mounted) return;

          setUserRole(
            (profile?.role as UserRole) || "user"
          );
        } else {
          setUserEmail("");
          setUserRole("user");
        }
      } catch (error) {
        console.error("Home auth error:", error);

        if (mounted) {
          setUserEmail("");
          setUserRole("user");
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (session?.user) {
          setUserEmail(session.user.email || "");

          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .maybeSingle();

          if (!mounted) return;

          setUserRole(
            (profile?.role as UserRole) || "user"
          );
        } else {
          setUserEmail("");
          setUserRole("user");
        }

        setCheckingAuth(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUserEmail("");
    setUserRole("user");
    setMenuOpen(false);

    navigate("/home", {
      replace: true,
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#173d3a]">

      {/* ================= NAVBAR ================= */}

      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">

            {/* LOGO */}

            <Link
              to="/home"
              className="text-2xl md:text-3xl font-black tracking-wide text-white"
            >
              FREEWILL
            </Link>

            {/* DESKTOP NAVIGATION */}

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

              {/* SIGN IN */}

              {!checkingAuth && !userEmail && (
                <Link
                  to="/login"
                  className="rounded-full bg-[#e8a83b] px-5 sm:px-6 py-3 text-sm font-bold text-[#173d3a] shadow-lg hover:bg-[#f2bd58] transition"
                >
                  Sign In
                </Link>
              )}

              {/* LOGOUT */}

              {!checkingAuth && userEmail && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-[#e8a83b] px-5 sm:px-6 py-3 text-sm font-bold text-[#173d3a] shadow-lg hover:bg-[#f2bd58] transition"
                >
                  Logout
                </button>
              )}

              {/* THREE LINE MENU */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                >
                  <div className="space-y-1.5">
                    <span className="block h-0.5 w-6 bg-white" />
                    <span className="block h-0.5 w-6 bg-white" />
                    <span className="block h-0.5 w-6 bg-white" />
                  </div>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

                    {/* USER INFORMATION */}

                    <div className="border-b border-gray-100 bg-[#f7f4ed] px-5 py-4">

                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                        {userEmail
                          ? userRole === "expert"
                            ? "Expert Account"
                            : userRole === "admin"
                            ? "Administrator"
                            : "FREEWILL User"
                          : "FREEWILL"}
                      </p>

                      <p className="mt-1 truncate text-sm font-bold text-[#173d3a]">
                        {userEmail || "Human Empowerment"}
                      </p>

                    </div>

                    {/* PUBLIC MENU */}

                    {!userEmail && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-4 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">📊</span>
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/my-appointments"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">📅</span>
                          <span>My Appointments</span>
                        </Link>
                      </>
                    )}

                    {/* USER MENU */}

                    {userEmail && userRole === "user" && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-4 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">📊</span>
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/my-appointments"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">📅</span>
                          <span>My Appointments</span>
                        </Link>
                      </>
                    )}

                    {/* EXPERT MENU */}

                    {userEmail && userRole === "expert" && (
                      <>
                        <Link
                          to="/expert-dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-4 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">📊</span>
                          <span>Expert Dashboard</span>
                        </Link>

                        <Link
                          to="/expert-profile"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">👤</span>
                          <span>My Profile</span>
                        </Link>

                        <Link
                          to="/expert-services"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">💼</span>
                          <span>My Services</span>
                        </Link>
                      </>
                    )}

                    {/* ADMIN MENU */}

                    {userEmail && userRole === "admin" && (
                      <Link
                        to="/admin-dashboard"
                        onClick={closeMenu}
                        className="flex items-center gap-4 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                      >
                        <span className="text-xl">🛡️</span>
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    {/* WHATSAPP */}

                    <a
                      href="https://wa.me/919841624060"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                    >
                      <span className="text-xl">🟢</span>
                      <span>WhatsApp</span>
                    </a>

                    {/* INSTAGRAM */}

                    <a
                      href="https://www.instagram.com/simonanandhraj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                    >
                      <span className="text-xl">📸</span>
                      <span>Instagram</span>
                    </a>

                    {/* LOGOUT */}

                    {userEmail && (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 border-t border-gray-100 px-5 py-4 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                      >
                        <span className="text-xl">🚪</span>
                        <span>Logout</span>
                      </button>
                    )}

                    {/* SIGN IN */}

                    {!userEmail && (
                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                      >
                        <span className="text-xl">🔐</span>
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

            {/* BOSS IMAGE */}

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

      {/* ================= INTRO ================= */}

      <section
        id="about"
        className="bg-[#f7f4ed] py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
                About FREEWILL
              </p>

              <h2 className="mt-4 text-3xl md:text-5xl font-black leading-tight text-[#173d3a]">
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
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                Through self-assessment, professional counselling and
                psycho-spiritual exploration, we create a space where
                people can pause, understand and take their next step.
              </p>

              <Link
                to="/assessment"
                className="mt-7 inline-block rounded-full bg-[#0d4743] px-7 py-4 font-bold text-white hover:bg-[#12554f] transition"
              >
                Discover Yourself →
              </Link>

            </div>

            <div className="relative">

              <div className="absolute -inset-5 rounded-[2rem] bg-[#e6d9bb]/50" />

              <div className="relative overflow-hidden rounded-[2rem] bg-[#0d4743] p-6 md:p-8">

                <div className="flex items-end justify-center">

                  <img
                    src={bossImage}
                    alt="FREEWILL Founder"
                    className="max-h-[420px] w-full object-contain"
                  />

                </div>

                <div className="border-t border-white/10 pt-5 text-center">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#eab34a]">
                    Founder / Human Empowerment
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    FREEWILL
                  </h3>

                  <p className="mt-2 text-sm text-white/60">
                    Empowering people to understand themselves better.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= WHY FREEWILL ================= */}

      <section className="bg-white py-20 md:py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              Why FREEWILL
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-black text-[#173d3a]">
              Designed Around You
            </h2>

            <p className="mt-4 text-gray-600">
              A simple, confidential and supportive experience.
            </p>

          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-7">

            <div className="rounded-[2rem] bg-[#f3f7f5] p-8 transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d4743] text-2xl">
                🧠
              </div>

              <h3 className="mt-7 text-xl font-bold">
                Understand Yourself
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Explore your thoughts, emotions and wellbeing through
                simple self-assessment tools.
              </p>

            </div>

            <div className="rounded-[2rem] bg-[#f8f1e1] p-8 transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8a83b] text-2xl">
                💬
              </div>

              <h3 className="mt-7 text-xl font-bold">
                Get Professional Support
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Connect with counselling professionals when you need
                guidance and support.
              </p>

            </div>

            <div className="rounded-[2rem] bg-[#edf4f2] p-8 transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d4743] text-2xl">
                🌱
              </div>

              <h3 className="mt-7 text-xl font-bold">
                Grow With Purpose
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Turn awareness into meaningful action and create a more
                empowered direction for your life.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= QUOTE ================= */}

      <section className="bg-[#f7f4ed] py-20">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <p className="text-6xl font-serif text-[#d49a2c]">
            “
          </p>

          <h2 className="mt-2 text-3xl md:text-5xl font-black leading-tight text-[#173d3a]">
            The first step towards
            <br />
            transformation is
            <span className="text-[#c88d22]">
              understanding.
            </span>
          </h2>

          <p className="mt-6 text-gray-500">
            FREEWILL — Human Empowerment
          </p>

        </div>

      </section>

      {/* ================= PROCESS ================= */}

      <section
        id="process"
        className="bg-[#0d4743] py-20 md:py-24 text-white"
      >

        <div className="mx-auto max-w-6xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eab34a]">
              Your Journey
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-black">
              Three Simple Steps
            </h2>

          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-8">

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">

              <span className="text-5xl font-black text-[#eab34a]">
                01
              </span>

              <h3 className="mt-7 text-2xl font-bold">
                Take Assessment
              </h3>

              <p className="mt-4 leading-7 text-white/65">
                Complete our simple wellbeing questionnaire and reflect
                on your current state.
              </p>

            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">

              <span className="text-5xl font-black text-[#eab34a]">
                02
              </span>

              <h3 className="mt-7 text-2xl font-bold">
                Understand Your Result
              </h3>

              <p className="mt-4 leading-7 text-white/65">
                Receive an easy-to-understand overview that helps you
                recognise areas that may need attention.
              </p>

            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">

              <span className="text-5xl font-black text-[#eab34a]">
                03
              </span>

              <h3 className="mt-7 text-2xl font-bold">
                Get Support
              </h3>

              <p className="mt-4 leading-7 text-white/65">
                Book an appointment and connect with professional
                counselling support.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= EXPERTS ================= */}

      <ExpertScrollCarousel />

      {/* ================= SERVICES ================= */}

      <section
        id="services"
        className="bg-white py-20 md:py-24"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-black text-[#173d3a]">
              Our Services
            </h2>

          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-7">

            <div className="group rounded-[2rem] border border-[#e3e8e5] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

              <div className="text-4xl">
                🧠
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Mental Wellness Assessment
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Take a simple assessment and receive an instant
                wellbeing result.
              </p>

              <Link
                to="/assessment"
                className="mt-7 inline-block font-bold text-[#c88d22]"
              >
                Start Assessment →
              </Link>

            </div>

            <div className="group rounded-[2rem] border border-[#e3e8e5] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

              <div className="text-4xl">
                💬
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Professional Counselling
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Connect with trained professionals for personalised
                support and guidance.
              </p>

              <Link
                to="/booking"
                className="mt-7 inline-block font-bold text-[#c88d22]"
              >
                Book Appointment →
              </Link>

            </div>

            <div className="group rounded-[2rem] border border-[#e3e8e5] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

              <div className="text-4xl">
                📅
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Manage Appointments
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                View and manage your counselling appointments easily
                from your account.
              </p>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="mt-7 inline-block font-bold text-[#c88d22]"
              >
                My Appointments →
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="bg-[#f7f4ed] py-20">

        <div className="mx-auto max-w-6xl px-6">

          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#123f3b] px-7 py-14 md:px-16 md:py-16 text-center">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1a5b55] blur-2xl" />

            <div className="relative z-10">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eab34a]">
                Begin Today
              </p>

              <h2 className="mt-4 text-3xl md:text-5xl font-black text-white">
                Ready to understand yourself better?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">
                Take the first step towards greater self-awareness,
                wellbeing and personal empowerment.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">

                <Link
                  to="/assessment"
                  className="rounded-full bg-[#e8a83b] px-8 py-4 font-bold text-[#173d3a] hover:bg-[#f2bd58] transition"
                >
                  Take Assessment
                </Link>

                <Link
                  to="/booking"
                  className="rounded-full border border-white/30 px-8 py-4 font-bold text-white hover:bg-white/10 transition"
                >
                  Book Counselling
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-[#082f2d] text-white">

        <div className="mx-auto max-w-7xl px-6 py-12">

          <div className="grid md:grid-cols-3 gap-10">

            <div>

              <h3 className="text-2xl font-black">
                FREEWILL
              </h3>

              <p className="mt-2 font-semibold text-[#eab34a]">
                Human Empowerment
              </p>

              <p className="mt-4 max-w-sm leading-7 text-white/55">
                World's First Psycho-Spiritual and Quantum Philosophical
                Training Firm.
              </p>

            </div>

            <div>

              <h4 className="font-bold">
                Quick Links
              </h4>

              <div className="mt-4 flex flex-col gap-3 text-sm text-white/55">

                <Link
                  to="/home"
                  className="hover:text-[#eab34a]"
                >
                  Home
                </Link>

                <a
                  href="#about"
                  className="hover:text-[#eab34a]"
                >
                  About
                </a>

                <a
                  href="#experts"
                  className="hover:text-[#eab34a]"
                >
                  Experts
                </a>

                <a
                  href="#services"
                  className="hover:text-[#eab34a]"
                >
                  Services
                </a>

                <a
                  href="#process"
                  className="hover:text-[#eab34a]"
                >
                  How It Works
                </a>

                <Link
                  to="/assessment"
                  className="hover:text-[#eab34a]"
                >
                  Assessment
                </Link>

                <Link
                  to="/booking"
                  className="hover:text-[#eab34a]"
                >
                  Appointment
                </Link>

                {!userEmail && (
                  <Link
                    to="/login"
                    className="hover:text-[#eab34a]"
                  >
                    Sign In
                  </Link>
                )}

                {userEmail && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left hover:text-[#eab34a]"
                  >
                    Logout
                  </button>
                )}

              </div>

            </div>

            <div>

              <h4 className="font-bold">
                Start Your Journey
              </h4>

              <p className="mt-4 leading-7 text-white/55">
                Take a meaningful first step towards understanding
                yourself better.
              </p>

              <Link
                to="/assessment"
                className="mt-5 inline-block rounded-full bg-[#e8a83b] px-6 py-3 font-bold text-[#173d3a]"
              >
                Get Started →
              </Link>

            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">

            <p>
              © 2026 FREEWILL. All rights reserved.
            </p>

            <a
              href="https://www.instagram.com/ragul_arunan/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[11px] font-serif tracking-wide text-white/30 transition hover:text-[#eab34a]"
              aria-label="Ragul Arunan Instagram"
            >
              𝓡𝓪𝓰𝓾𝓵 𝓐𝓻𝓾𝓷𝓪𝓷
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
}

/* ========================================================= */
/* ================ 3D SCROLL EXPERT CAROUSEL ============== */
/* ========================================================= */

function ExpertScrollCarousel() {

  const sectionRef = useRef<HTMLElement | null>(null);

  const [carouselPosition, setCarouselPosition] =
    useState(0);

  const experts: Expert[] = [

    {
      image: bossImage,
      experience: "26 YEARS EXPERIENCE",
      role: "Founder / CEO",
      name: "Simon Anandh Raj",
      title: "Emotional Intelligence Coach",
      description:
        "Simon Anandh Raj is the Founder & CEO and an experienced Emotional Intelligence Coach with 26 years of professional experience in training, coaching, mentoring and human development. His work focuses on helping individuals and organisations develop emotional intelligence, improve self-awareness, strengthen relationships and unlock their potential.",
      services: [
        ["One Hour", "₹1,500"],
        ["Psychometric Analysis", "₹2,500"],
        ["One-to-One Session", "₹3,000"],
        ["Training Sessions", "₹12,000"],
        ["Mentoring", "₹25,000"],
      ],
      note:
        "Extended sessions and specialised programs may range from ₹5,000 to ₹50,000.",
      button: "Book a Session →",
      light: false,
    },

    {
      image: jeevithaImage,
      experience: "5 YEARS EXPERIENCE",
      role: "Clinical Psychologist / Project Head",
      name: "Jeevitha S",
      title: "Clinical Psychologist & Project Head",
      description:
        "Jeevitha S is a Clinical Psychologist and Project Head with 5 years of experience in counselling, coaching and professional training. She focuses on creating a supportive and structured environment where individuals can gain clarity, develop emotional awareness and work towards meaningful personal growth.",
      services: [
        ["One Hour", "₹1,500"],
        ["Psychometric Analysis", "₹2,500"],
        ["One-to-One Session", "₹3,000"],
        ["Training Sessions", "₹12,000"],
        ["Mentoring", "₹25,000"],
      ],
      note:
        "Session pricing may range from ₹1,000 to ₹10,000 depending on the service.",
      button: "Book a Session →",
      light: true,
    },

    {
      image: rahulImage,
      experience: "7 YEARS EXPERIENCE",
      role: "Life Coach / Content Head",
      name: "Rahul K.P",
      title: "Life Coach & Content Head",
      description:
        "Rahul K.P is a Life Coach and Content Head with 7 years of experience in training and content management. His work combines personal development, structured learning and effective communication to help individuals build confidence, develop practical skills and move towards their goals.",
      services: [
        ["Focus", "Life Coaching"],
        ["Training", "Personal Development"],
        ["Content", "Content Management"],
      ],
      note:
        "Service pricing will be available based on the selected program.",
      button: "Explore & Book →",
      light: false,
    },

  ];

  useEffect(() => {

    const section = sectionRef.current;

    if (!section) return;

    let frame = 0;

    const updateCarousel = () => {

      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {

        const rect =
          section.getBoundingClientRect();

        const viewportHeight =
          window.innerHeight;

        const scrollDistance =
          section.offsetHeight -
          viewportHeight;

        if (scrollDistance <= 0) {
          setCarouselPosition(0);
          return;
        }

        const passed = Math.min(
          Math.max(-rect.top, 0),
          scrollDistance
        );

        const progress =
          passed / scrollDistance;

        const maxPosition =
          experts.length - 1;

        const position =
          progress * maxPosition;

        setCarouselPosition(position);

      });

    };

    updateCarousel();

    window.addEventListener(
      "scroll",
      updateCarousel,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateCarousel
    );

    return () => {

      cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        updateCarousel
      );

      window.removeEventListener(
        "resize",
        updateCarousel
      );

    };

  }, [experts.length]);

  const bookService = (
    expert: Expert,
    service: string,
    price: string
  ) => {

    const params =
      new URLSearchParams();

    params.set(
      "expert",
      expert.name
    );

    params.set(
      "service",
      service
    );

    params.set(
      "price",
      price
    );

    navigateToBooking(
      `/booking?${params.toString()}`
    );

  };

  return (

    <section
      ref={sectionRef}
      id="experts"
      className="relative bg-[#f7f4ed]"
      style={{
        height:
          "calc(100vh + 260vh)",
      }}
    >

      {/* STICKY EXPERT EXPERIENCE */}

      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BACKGROUND GLOW */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6d9bb]/30 blur-3xl" />

          <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#0d4743]/10 blur-3xl" />

          <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#e8a83b]/10 blur-3xl" />

        </div>

        {/* HEADING */}

        <div className="absolute left-0 right-0 top-8 z-40 px-6 md:top-10">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              Meet Our Experts
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#173d3a] sm:text-3xl md:text-4xl">
              Guidance From Experienced Professionals
            </h2>

            <p className="mx-auto mt-2 hidden max-w-2xl text-sm leading-6 text-gray-600 md:block">
              Connect with experienced professionals who bring expertise,
              compassion and practical guidance to your personal growth journey.
            </p>

          </div>

        </div>

        {/* CAROUSEL STAGE */}

        <div className="relative flex h-full items-center justify-center px-4 pt-20 md:px-8 md:pt-24">

          <div
            className="relative h-[72vh] w-full max-w-[460px] md:h-[74vh] md:max-w-[500px]"
            style={{
              perspective: "1400px",
            }}
          >

            {experts.map(
              (expert, index) => {

                const offset =
                  index - carouselPosition;

                const distance =
                  Math.abs(offset);

                const translateX =
                  offset * 112;

                const rotateY =
                  offset * -30;

                const translateZ =
                  -Math.min(
                    distance * 150,
                    420
                  );

                const scale =
                  Math.max(
                    0.76,
                    1 - distance * 0.12
                  );

                const opacity =
                  Math.max(
                    0,
                    1 - distance * 0.48
                  );

                const blur =
                  Math.min(
                    distance * 1.5,
                    5
                  );

                const zIndex =
                  100 -
                  Math.round(
                    distance * 10
                  );

                return (

                  <div
                    key={expert.name}
                    className="absolute inset-0"
                    style={{
                      transform: `
                        translateX(${translateX}%)
                        translateZ(${translateZ}px)
                        rotateY(${rotateY}deg)
                        scale(${scale})
                      `,
                      opacity,
                      filter:
                        distance > 0.15
                          ? `blur(${blur}px)`
                          : "blur(0px)",
                      zIndex,
                      transformStyle:
                        "preserve-3d",
                      transition:
                        "transform 120ms linear, opacity 120ms linear, filter 120ms linear",
                      pointerEvents:
                        distance < 0.45
                          ? "auto"
                          : "none",
                    }}
                  >

                    <ExpertCharacterCard
                      expert={expert}
                      onBookService={bookService}
                    />

                  </div>

                );

              }
            )}

          </div>

        </div>

        {/* SCROLL INDICATOR */}

        <div className="absolute bottom-5 left-1/2 z-50 -translate-x-1/2">

          <div className="flex items-center gap-3 rounded-full border border-[#0d4743]/10 bg-white/70 px-5 py-2.5 shadow-lg backdrop-blur-md">

            <span className="h-2 w-2 animate-pulse rounded-full bg-[#e8a83b]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#173d3a]">
              Scroll to explore
            </span>

          </div>

        </div>

      </div>

    </section>

  );

}

/* ========================================================= */
/* ================= EXPERT CHARACTER CARD ================= */
/* ========================================================= */

function ExpertCharacterCard({
  expert,
  onBookService,
}: {
  expert: Expert;
  onBookService: (
    expert: Expert,
    service: string,
    price: string
  ) => void;
}) {

  return (

    <div
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[2rem]
        border
        border-[#ded8ca]
        bg-white
        shadow-[0_30px_80px_rgba(23,61,58,0.18)]
      "
      style={{
        transformStyle:
          "preserve-3d",
      }}
    >

      {/* CHARACTER IMAGE */}

      <div
        className={`
          relative
          h-[30%]
          min-h-[180px]
          shrink-0
          overflow-hidden
          ${
            expert.light
              ? "bg-[#f0e7d4]"
              : "bg-[#0d4743]"
          }
        `}
      >

        {/* GOLD RING */}

        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#eab34a]/20" />

        <div className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-[#e8a83b]/10 blur-3xl" />

        <img
          src={expert.image}
          alt={expert.name}
          className={`
            relative
            z-10
            h-full
            w-full
            ${
              expert.name === "Simon Anandh Raj"
                ? "object-contain"
                : "object-cover"
            }
          `}
        />

        <div className="absolute bottom-4 left-4 z-20 rounded-full bg-[#e8a83b] px-4 py-2 text-[10px] font-black tracking-wide text-[#173d3a] shadow-lg">
          {expert.experience}
        </div>

      </div>

      {/* CONTENT */}

      <div className="flex min-h-0 flex-1 flex-col p-5 md:p-6">

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">

          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#c88d22]">
            {expert.role}
          </p>

          <h3 className="mt-1 text-2xl font-black text-[#173d3a]">
            {expert.name}
          </h3>

          <p className="mt-1 text-sm font-semibold text-gray-700">
            {expert.title}
          </p>

          <p className="mt-3 text-xs leading-5 text-gray-600">
            {expert.description}
          </p>

          <div className="mt-4 border-t border-gray-100 pt-4">

            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Services
            </p>

            <div className="mt-3 space-y-2">

              {expert.services.map(
                ([service, price]) => (

                  <div
                    key={`${expert.name}-${service}`}
                    className="rounded-xl border border-[#e7e3d9] bg-[#faf9f5] p-2.5"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-xs font-semibold text-[#173d3a]">
                        {service}
                      </span>

                      <span className="shrink-0 text-xs font-black text-[#c88d22]">
                        {price}
                      </span>

                    </div>

                    {/* INDIVIDUAL BOOK BUTTON */}

                    <button
                      type="button"
                      onClick={() =>
                        onBookService(
                          expert,
                          service,
                          price
                        )
                      }
                      className="mt-2 w-full rounded-lg bg-[#0d4743] px-3 py-2 text-[10px] font-bold text-white transition hover:bg-[#12554f]"
                    >
                      Book this session →
                    </button>

                  </div>

                )
              )}

            </div>

            <p className="mt-3 text-[10px] leading-4 text-gray-400">
              {expert.note}
            </p>

          </div>

        </div>

        {/* MAIN EXPERT BUTTON */}

        <button
          type="button"
          onClick={() => {

            const firstService =
              expert.services[0];

            onBookService(
              expert,
              firstService[0],
              firstService[1]
            );

          }}
          className="mt-4 w-full shrink-0 rounded-full bg-[#0d4743] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#12554f]"
        >
          {expert.button}
        </button>

      </div>

    </div>

  );

}

/* ========================================================= */
/* ================= BOOKING NAVIGATION ==================== */
/* ========================================================= */

function navigateToBooking(path: string) {
  window.location.href = path;
}

export default Home;
