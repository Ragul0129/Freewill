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

function Home() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserEmail(user.email || "");

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        setUserRole(profile?.role || "user");
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserEmail(session.user.email || "");

        supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()
          .then(({ data: profile }) => {
            setUserRole(profile?.role || "user");
          });
      } else {
        setUserEmail("");
        setUserRole("user");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate("/login");
  };

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

            <div className="flex items-center gap-3">

              <Link
                to="/assessment"
                className="hidden sm:block rounded-full bg-[#e8a83b] px-6 py-3 text-sm font-bold text-[#173d3a] shadow-lg hover:bg-[#f2bd58] transition"
              >
                Get Started
              </Link>

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
                    <span className="block h-0.5 w-6 bg-white"></span>
                    <span className="block h-0.5 w-6 bg-white"></span>
                    <span className="block h-0.5 w-6 bg-white"></span>
                  </div>
                </button>

                {/* DROPDOWN MENU */}
                {menuOpen && (
                  <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

                    <div className="border-b border-gray-100 bg-[#f7f4ed] px-5 py-4">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                        Logged In
                      </p>

                      <p className="mt-1 truncate text-sm font-bold text-[#173d3a]">
                        {userEmail || "FREEWILL User"}
                      </p>
                    </div>

                    {/* ================= EXPERT MENU ================= */}
                    {userRole === "expert" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            navigate("/expert-dashboard");
                          }}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">📊</span>
                          <span>Expert Dashboard</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            navigate("/expert-profile");
                          }}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">👤</span>
                          <span>My Profile</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            navigate("/expert-services");
                          }}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">💼</span>
                          <span>My Services</span>
                        </button>
                      </>

                    ) : userRole === "admin" ? (

                      /* ================= ADMIN MENU ================= */
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/admin-dashboard");
                        }}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                      >
                        <span className="text-xl">🛡️</span>
                        <span>Admin Dashboard</span>
                      </button>

                    ) : (

                      /* ================= NORMAL USER MENU ================= */
                      <>
                        {/* DASHBOARD */}
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            navigate("/dashboard");
                          }}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">📊</span>
                          <span>Dashboard</span>
                        </button>

                        {/* MY APPOINTMENTS */}
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            navigate("/my-appointments");
                          }}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="text-xl">📅</span>
                          <span>My Appointments</span>
                        </button>

                        {/* WHATSAPP */}
                        <a
                          href="https://wa.me/919841624060"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuOpen(false)}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-lg text-white">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5 fill-current"
                              aria-hidden="true"
                            >
                              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.48 0 .13 5.35.13 11.91c0 2.1.55 4.15 1.59 5.96L.02 24l6.27-1.64a11.86 11.86 0 0 0 5.74 1.47h.01c6.56 0 11.91-5.35 11.91-11.91 0-3.18-1.24-6.17-3.43-8.44ZM12.04 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.85 9.85 0 0 1-1.51-5.27C2.17 6.56 6.6 2.2 12.04 2.2c2.64 0 5.12 1.03 6.98 2.89a9.83 9.83 0 0 1 2.89 6.99c0 5.43-4.43 9.72-9.87 9.72Zm5.4-7.29c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52-.18-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
                            </svg>
                          </span>

                          <span>WhatsApp</span>
                        </a>

                        {/* INSTAGRAM */}
                        <a
                          href="https://www.instagram.com/simonanandhraj/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuOpen(false)}
                          className="flex w-full items-center gap-4 px-5 py-4 text-left text-sm font-semibold text-[#173d3a] hover:bg-[#f7f4ed] transition"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5 fill-none stroke-current"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="5"
                                ry="5"
                              />
                              <circle cx="12" cy="12" r="4" />
                              <circle
                                cx="17.5"
                                cy="6.5"
                                r="1"
                                className="fill-current stroke-none"
                              />
                            </svg>
                          </span>

                          <span>Instagram</span>
                        </a>
                      </>
                    )}

                    {/* ================= LOGOUT ================= */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-4 border-t border-gray-100 px-5 py-4 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                    >
                      <span className="text-xl">🚪</span>
                      <span>Logout</span>
                    </button>

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
      <section id="about" className="bg-[#f7f4ed] py-20 md:py-28">

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
      <section
        id="experts"
        className="bg-[#f7f4ed] py-20 md:py-28"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              Meet Our Experts
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-black text-[#173d3a]">
              Guidance From Experienced Professionals
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Connect with experienced professionals who bring expertise,
              compassion and practical guidance to your personal growth journey.
            </p>

          </div>

          <div className="mt-14 grid lg:grid-cols-3 gap-8">

            {/* SIMON */}
            <div className="group overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

              <div className="relative h-[360px] overflow-hidden bg-[#0d4743]">

                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#eab34a]/20" />

                <img
                  src={bossImage}
                  alt="Simon Anandh Raj"
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-4 left-4 rounded-full bg-[#e8a83b] px-4 py-2 text-xs font-bold text-[#173d3a]">
                  26 YEARS EXPERIENCE
                </div>

              </div>

              <div className="p-7">

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                  Founder / CEO
                </p>

                <h3 className="mt-2 text-2xl font-black text-[#173d3a]">
                  Simon Anandh Raj
                </h3>

                <p className="mt-2 font-semibold text-gray-700">
                  Emotional Intelligence Coach
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Training, Coaching & Mentoring
                </p>

                <p className="mt-5 text-sm leading-7 text-gray-600">
                  Simon Anandh Raj is the Founder & CEO and an experienced
                  Emotional Intelligence Coach with 26 years of professional
                  experience in training, coaching, mentoring and human
                  development. His work focuses on helping individuals and
                  organisations develop emotional intelligence, improve
                  self-awareness, strengthen relationships and unlock their
                  potential.
                </p>

                <div className="mt-6 border-t border-gray-100 pt-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Services
                  </p>

                  <div className="mt-3 space-y-2 text-sm text-gray-600">

                    <div className="flex justify-between">
                      <span>One Hour</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹1,500
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Psychometric Analysis</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹2,500
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>One-to-One Session</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹3,000
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Training Sessions</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹12,000
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Mentoring</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹25,000
                      </span>
                    </div>

                  </div>

                  <p className="mt-4 text-xs text-gray-400">
                    Extended sessions and specialised programs may range from
                    ₹5,000 to ₹50,000.
                  </p>

                </div>

                <Link
                  to="/booking"
                  className="mt-7 block rounded-full bg-[#0d4743] px-6 py-4 text-center font-bold text-white transition hover:bg-[#12554f]"
                >
                  Book a Session →
                </Link>

              </div>
            </div>

            {/* JEEVITHA */}
            <div className="group overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

              <div className="relative h-[360px] overflow-hidden bg-[#f0e7d4]">

                <img
                  src={jeevithaImage}
                  alt="Jeevitha S"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-4 left-4 rounded-full bg-[#e8a83b] px-4 py-2 text-xs font-bold text-[#173d3a]">
                  5 YEARS EXPERIENCE
                </div>

              </div>

              <div className="p-7">

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                  Clinical Psychologist / Project Head
                </p>

                <h3 className="mt-2 text-2xl font-black text-[#173d3a]">
                  Jeevitha S
                </h3>

                <p className="mt-2 font-semibold text-gray-700">
                  Clinical Psychologist & Project Head
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Training, Counselling & Coaching
                </p>

                <p className="mt-5 text-sm leading-7 text-gray-600">
                  Jeevitha S is a Clinical Psychologist and Project Head with
                  5 years of experience in counselling, coaching and professional
                  training. She focuses on creating a supportive and structured
                  environment where individuals can gain clarity, develop
                  emotional awareness and work towards meaningful personal growth.
                </p>

                <div className="mt-6 border-t border-gray-100 pt-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Services
                  </p>

                  <div className="mt-3 space-y-2 text-sm text-gray-600">

                    <div className="flex justify-between">
                      <span>One Hour</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹1,500
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Psychometric Analysis</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹2,500
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>One-to-One Session</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹3,000
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Training Sessions</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹12,000
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Mentoring</span>
                      <span className="font-bold text-[#173d3a]">
                        ₹25,000
                      </span>
                    </div>

                  </div>

                  <p className="mt-4 text-xs text-gray-400">
                    Session pricing may range from ₹1,000 to ₹10,000 depending
                    on the service.
                  </p>

                </div>

                <Link
                  to="/booking"
                  className="mt-7 block rounded-full bg-[#0d4743] px-6 py-4 text-center font-bold text-white transition hover:bg-[#12554f]"
                >
                  Book a Session →
                </Link>

              </div>
            </div>

            {/* RAHUL */}
            <div className="group overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

              <div className="relative h-[360px] overflow-hidden bg-[#0d4743]">

                <img
                  src={rahulImage}
                  alt="Rahul K.P"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-4 left-4 rounded-full bg-[#e8a83b] px-4 py-2 text-xs font-bold text-[#173d3a]">
                  7 YEARS EXPERIENCE
                </div>

              </div>

              <div className="p-7">

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                  Life Coach / Content Head
                </p>

                <h3 className="mt-2 text-2xl font-black text-[#173d3a]">
                  Rahul K.P
                </h3>

                <p className="mt-2 font-semibold text-gray-700">
                  Life Coach & Content Head
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Training & Content Management
                </p>

                <p className="mt-5 text-sm leading-7 text-gray-600">
                  Rahul K.P is a Life Coach and Content Head with 7 years of
                  experience in training and content management. His work combines
                  personal development, structured learning and effective
                  communication to help individuals build confidence, develop
                  practical skills and move towards their goals.
                </p>

                <div className="mt-6 border-t border-gray-100 pt-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Focus Areas
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-full bg-[#edf4f2] px-3 py-2 text-xs font-semibold text-[#173d3a]">
                      Life Coaching
                    </span>

                    <span className="rounded-full bg-[#f8f1e1] px-3 py-2 text-xs font-semibold text-[#173d3a]">
                      Training
                    </span>

                    <span className="rounded-full bg-[#edf4f2] px-3 py-2 text-xs font-semibold text-[#173d3a]">
                      Content Management
                    </span>

                  </div>

                  <p className="mt-5 text-xs text-gray-400">
                    Service pricing will be available based on the selected
                    program.
                  </p>

                </div>

                <Link
                  to="/booking"
                  className="mt-7 block rounded-full bg-[#0d4743] px-6 py-4 text-center font-bold text-white transition hover:bg-[#12554f]"
                >
                  Explore & Book →
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

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
                onClick={() => navigate("/my-appointments")}
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
            © 2026 FREEWILL. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}

export default Home;
