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

type UserRole = "user" | "expert" | "admin" | null;

type Expert = {
  image: string;
  experience: string;
  role: string;
  name: string;
  title: string;
  description: string;
  services: [string, string][];
  note: string;
};

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

    navigate("/home", {
      replace: true,
    });
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
      {/* ========================================================= */}
      {/* ======================= NAVBAR ========================== */}
      {/* ========================================================= */}

      <header className="absolute left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            {/* LOGO */}

            <Link
              to="/home"
              className="text-2xl font-black tracking-wide text-white md:text-3xl"
            >
              FREEWILL
            </Link>

            {/* DESKTOP NAV */}

            <nav className="hidden items-center gap-8 text-sm font-medium text-white/90 lg:flex">
              <Link
                to="/home"
                className="transition hover:text-[#e9ad3d]"
              >
                Home
              </Link>

              <a
                href="#about"
                className="transition hover:text-[#e9ad3d]"
              >
                About
              </a>

              <a
                href="#experts"
                className="transition hover:text-[#e9ad3d]"
              >
                Experts
              </a>

              <a
                href="#services"
                className="transition hover:text-[#e9ad3d]"
              >
                Services
              </a>

              <a
                href="#process"
                className="transition hover:text-[#e9ad3d]"
              >
                How It Works
              </a>

              <Link
                to="/booking"
                className="transition hover:text-[#e9ad3d]"
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
                  className="rounded-full bg-[#e8a83b] px-5 py-3 text-sm font-bold text-[#173d3a] shadow-lg transition hover:bg-[#f2bd58] sm:px-6"
                >
                  Sign In
                </Link>
              )}

              {/* LOGOUT */}

              {!checkingAuth && userEmail && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-[#e8a83b] px-5 py-3 text-sm font-bold text-[#173d3a] shadow-lg transition hover:bg-[#f2bd58] sm:px-6"
                >
                  Logout
                </button>
              )}

              {/* MENU */}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((value) => !value)}
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
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

                    {/* PUBLIC MENU */}

                    {!userEmail && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={closeMenu}
                          className="flex items-center gap-4 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                        >
                          <span className="text-lg">📊</span>
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/my-appointments"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                        >
                          <span className="text-lg">📅</span>
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
                          className="flex items-center gap-4 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                        >
                          <span className="text-lg">📊</span>
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/my-appointments"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                        >
                          <span className="text-lg">📅</span>
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
                          className="flex items-center gap-4 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                        >
                          <span className="text-lg">📊</span>
                          <span>Expert Dashboard</span>
                        </Link>

                        <Link
                          to="/expert-profile"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                        >
                          <span className="text-lg">👤</span>
                          <span>My Profile</span>
                        </Link>

                        <Link
                          to="/expert-services"
                          onClick={closeMenu}
                          className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                        >
                          <span className="text-lg">🛠️</span>
                          <span>My Services</span>
                        </Link>
                      </>
                    )}

                    {/* ADMIN MENU */}

                    {userEmail && userRole === "admin" && (
                      <Link
                        to="/admin-dashboard"
                        onClick={closeMenu}
                        className="flex items-center gap-4 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                      >
                        <span className="text-lg">🛡️</span>
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    {/* WHATSAPP */}

                    <a
                      href="https://wa.me/919841624060"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                    >
                      <span className="text-lg">🟢</span>
                      <span>WhatsApp</span>
                    </a>

                    {/* INSTAGRAM */}

                    <a
                      href="https://www.instagram.com/simonanandhraj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
                    >
                      <span className="text-lg">📸</span>
                      <span>Instagram</span>
                    </a>

                    {/* LOGOUT */}

                    {userEmail && (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 border-t border-gray-100 px-5 py-4 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <span className="text-lg">🚪</span>
                        <span>Logout</span>
                      </button>
                    )}

                    {/* SIGN IN */}

                    {!userEmail && (
                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold transition hover:bg-[#f7f4ed]"
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

      {/* ========================================================= */}
      {/* ========================= HERO ========================== */}
      {/* ========================================================= */}

      <section className="relative min-h-[720px] overflow-hidden bg-[#0d4743] text-white">
        <div className="absolute -right-32 top-20 h-[520px] w-[520px] rounded-full border border-white/10" />

        <div className="absolute -right-20 top-32 h-[400px] w-[400px] rounded-full bg-[#185c56]/60 blur-2xl" />

        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#083b38]/70 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-32 md:pt-40">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-lg tracking-widest text-[#eab34a]">
                  ★★★★★
                </span>

                <span className="text-sm text-white/70">
                  Human Empowerment
                </span>
              </div>

              <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#eab34a] md:text-base">
                FREEWILL – Human Empowerment
              </p>

              <h1 className="text-4xl font-black leading-[1.04] sm:text-5xl md:text-6xl xl:text-7xl">
                Understand Your Mind.
                <br />
                <span className="text-[#eab34a]">
                  Transform Your Life.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                World's First Psycho-Spiritual and Quantum Philosophical
                Training Firm — empowering individuals to understand
                themselves, discover their potential and create meaningful
                transformation.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/assessment"
                  className="rounded-full bg-[#e8a83b] px-7 py-4 font-bold text-[#173d3a] shadow-xl transition hover:bg-[#f2bd58]"
                >
                  Take Assessment →
                </Link>

                <Link
                  to="/booking"
                  className="rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
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
              <div className="absolute h-[390px] w-[390px] rounded-full bg-[#185d57] opacity-80 md:h-[500px] md:w-[500px]" />

              <div className="absolute h-[300px] w-[300px] rounded-full border border-[#eab34a]/20 md:h-[400px] md:w-[400px]" />

              <img
                src={bossImage}
                alt="FREEWILL Human Empowerment"
                className="relative z-10 max-h-[570px] w-full max-w-[520px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
              />

              <div className="absolute bottom-6 left-0 z-20 max-w-[260px] rounded-2xl border border-white/10 bg-[#083b38]/95 p-5 shadow-2xl backdrop-blur">
                <p className="font-serif text-3xl text-[#eab34a]">
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

      {/* ========================================================= */}
      {/* ========================= ABOUT ========================= */}
      {/* ========================================================= */}

      <section
        id="about"
        className="bg-[#f7f4ed] py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
                About FREEWILL
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
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
                psycho-spiritual exploration, we create a space where people
                can pause, understand and take their next step.
              </p>

              <Link
                to="/assessment"
                className="mt-7 inline-block rounded-full bg-[#0d4743] px-7 py-4 font-bold text-white transition hover:bg-[#12554f]"
              >
                Discover Yourself →
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#e6d9bb]/50" />

              <div className="relative overflow-hidden rounded-[2rem] bg-[#0d4743] p-6 md:p-8">
                <img
                  src={bossImage}
                  alt="FREEWILL Founder"
                  className="max-h-[420px] w-full object-contain"
                />

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

      {/* ========================================================= */}
      {/* ========================== WHY ========================== */}
      {/* ========================================================= */}

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              Why FREEWILL
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Designed Around You
            </h2>

            <p className="mt-4 text-gray-600">
              A simple, confidential and supportive experience.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {[
              [
                "🧠",
                "Understand Yourself",
                "Explore your thoughts, emotions and wellbeing through simple self-assessment tools.",
                "bg-[#f3f7f5]",
              ],
              [
                "💬",
                "Get Professional Support",
                "Connect with counselling professionals when you need guidance and support.",
                "bg-[#f8f1e1]",
              ],
              [
                "🌱",
                "Grow With Purpose",
                "Turn awareness into meaningful action and create a more empowered direction for your life.",
                "bg-[#edf4f2]",
              ],
            ].map(([icon, title, text, bg]) => (
              <div
                key={title}
                className={`rounded-[2rem] ${bg} p-8 transition hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d4743] text-2xl">
                  {icon}
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  {title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ========================= QUOTE ========================= */}
      {/* ========================================================= */}

      <section className="bg-[#f7f4ed] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-serif text-6xl text-[#d49a2c]">
            “
          </p>

          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">
            The first step towards
            <br />
            transformation is{" "}
            <span className="text-[#c88d22]">
              understanding.
            </span>
          </h2>

          <p className="mt-6 text-gray-500">
            FREEWILL — Human Empowerment
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ========================= PROCESS ======================= */}
      {/* ========================================================= */}

      <section
        id="process"
        className="bg-[#0d4743] py-20 text-white md:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eab34a]">
              Your Journey
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Three Simple Steps
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              [
                "01",
                "Take Assessment",
                "Complete our simple wellbeing questionnaire and reflect on your current state.",
              ],
              [
                "02",
                "Understand Your Result",
                "Receive an easy-to-understand overview that helps you recognise areas that may need attention.",
              ],
              [
                "03",
                "Get Support",
                "Book an appointment and connect with professional counselling support.",
              ],
            ].map(([num, title, text]) => (
              <div
                key={num}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
              >
                <span className="text-5xl font-black text-[#eab34a]">
                  {num}
                </span>

                <h3 className="mt-7 text-2xl font-bold">
                  {title}
                </h3>

                <p className="mt-4 leading-7 text-white/65">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ========================== EXPERTS ====================== */}
      {/* ========================================================= */}

      <section
        id="experts"
        className="relative overflow-hidden bg-[#f7f4ed] py-24 md:py-32"
      >
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#e8a83b]/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-1/2 h-[400px] w-[400px] rounded-full bg-[#174f4a]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              Meet Our Experts
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#173d3a] md:text-5xl">
              Guidance From Experienced Professionals
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Connect with experienced professionals who bring expertise,
              compassion and practical guidance to your personal growth
              journey.
            </p>
          </div>

          <ExpertCarousel />
        </div>
      </section>

      {/* ========================================================= */}
      {/* ========================= SERVICES ====================== */}
      {/* ========================================================= */}

      <section
        id="services"
        className="bg-white py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Our Services
            </h2>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            <ServiceCard
              icon="🧠"
              title="Mental Wellness Assessment"
              text="Take a simple assessment and receive an instant wellbeing result."
              link="/assessment"
              button="Start Assessment →"
            />

            <ServiceCard
              icon="💬"
              title="Professional Counselling"
              text="Connect with trained professionals for personalised support and guidance."
              link="/booking"
              button="Book Appointment →"
            />

            <ServiceCard
              icon="📅"
              title="Manage Appointments"
              text="View and manage your counselling appointments easily from your account."
              link="/dashboard"
              button="My Appointments →"
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* =========================== CTA ========================= */}
      {/* ========================================================= */}

      <section className="bg-[#f7f4ed] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#123f3b] px-7 py-14 text-center md:px-16 md:py-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1a5b55] blur-2xl" />

            <div className="relative z-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eab34a]">
                Begin Today
              </p>

              <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
                Ready to understand yourself better?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">
                Take the first step towards greater self-awareness,
                wellbeing and personal empowerment.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/assessment"
                  className="rounded-full bg-[#e8a83b] px-8 py-4 font-bold text-[#173d3a] transition hover:bg-[#f2bd58]"
                >
                  Take Assessment
                </Link>

                <Link
                  to="/booking"
                  className="rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
                >
                  Book Counselling
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ========================= FOOTER ======================== */}
      {/* ========================================================= */}

      <footer className="bg-[#082f2d] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-3">
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
                <Link to="/home">
                  Home
                </Link>

                <a href="#about">
                  About
                </a>

                <a href="#experts">
                  Experts
                </a>

                <a href="#services">
                  Services
                </a>

                <a href="#process">
                  How It Works
                </a>

                <Link to="/assessment">
                  Assessment
                </Link>

                <Link to="/booking">
                  Appointment
                </Link>

                {!userEmail && (
                  <Link to="/login">
                    Sign In
                  </Link>
                )}

                {userEmail && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left"
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
                Take a meaningful first step towards understanding yourself
                better.
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
/* ============== 3D VERTICAL EXPERT CAROUSEL ============= */
/* ========================================================= */

function ExpertCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const touchStart = useRef<number | null>(null);

  const experts: Expert[] = [
    {
      image: bossImage,
      experience: "26 YEARS EXPERIENCE",
      role: "Founder / CEO",
      name: "Simon Anand Raj",
      title: "Emotional Intelligence Coach",
      description:
        "Simon Anand Raj is the Founder & CEO and an experienced Emotional Intelligence Coach with 26 years of professional experience in training, coaching, mentoring and human development.",
      services: [
        ["One Hour", "₹1,500"],
        ["Psychometric Analysis", "₹2,500"],
        ["One-to-One Session", "₹3,000"],
        ["Training Sessions", "₹12,000"],
        ["Mentoring", "₹25,000"],
      ],
      note:
        "Extended sessions and specialised programs may range from ₹5,000 to ₹50,000.",
    },

    {
      image: jeevithaImage,
      experience: "5 YEARS EXPERIENCE",
      role: "Clinical Psychologist / Project Head",
      name: "Jeevitha S",
      title: "Clinical Psychologist & Project Head",
      description:
        "Jeevitha S is a Clinical Psychologist and Project Head with 5 years of experience in counselling, coaching and professional training. She focuses on creating a supportive and structured environment where individuals can gain clarity, develop emotional awareness.",
      services: [
        ["One Hour", "₹1,500"],
        ["Psychometric Analysis", "₹2,500"],
        ["One-to-One Session", "₹3,000"],
        ["Training Sessions", "₹12,000"],
        ["Mentoring", "₹25,000"],
      ],
      note:
        "Session pricing may range from ₹1,000 to ₹10,000 depending on the service.",
    },

    {
      image: rahulImage,
      experience: "7 YEARS EXPERIENCE",
      role: "Life Coach / Content Head",
      name: "Rahul K.P",
      title: "Life Coach & Content Head",
      description:
        "Rahul K.P is a Life Coach and Content Head with 7 years of experience in training and content management. His work combines personal development, structured learning and effective communication.",
      services: [
        ["Life Coaching", "Available"],
        ["Personal Development", "Available"],
        ["Content Management", "Available"],
      ],
      note:
        "Service pricing will be available based on the selected program.",
    },
  ];

  const changeExpert = (direction: 1 | -1) => {
    if (isAnimating) return;

    const nextIndex = activeIndex + direction;

    if (nextIndex < 0 || nextIndex >= experts.length) {
      return;
    }

    setIsAnimating(true);
    setActiveIndex(nextIndex);

    window.setTimeout(() => {
      setIsAnimating(false);
    }, 850);
  };

  /*
   * DESKTOP / LAPTOP WHEEL
   *
   * While the expert section is active:
   *
   * DOWN:
   * Simon -> Jeevitha -> Rahul
   *
   * UP:
   * Rahul -> Jeevitha -> Simon
   *
   * Once Rahul is active, normal page scrolling continues.
   */

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const section = document.getElementById("experts");

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const sectionCenter =
        rect.top + rect.height / 2;

      const viewportCenter =
        window.innerHeight / 2;

      const centerDistance = Math.abs(
        sectionCenter - viewportCenter
      );

      const isNearCenter =
        centerDistance < window.innerHeight * 0.42;

      if (!isNearCenter) return;

      if (Math.abs(event.deltaY) < 12) return;

      /*
       * DOWN
       */

      if (event.deltaY > 0) {
        if (activeIndex < experts.length - 1) {
          event.preventDefault();
          changeExpert(1);
        }

        return;
      }

      /*
       * UP
       */

      if (event.deltaY < 0) {
        if (activeIndex > 0) {
          event.preventDefault();
          changeExpert(-1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );
    };
  }, [activeIndex, isAnimating]);

  /*
   * MOBILE TOUCH
   */

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (!event.touches.length) return;

      touchStart.current =
        event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStart.current === null) return;

      if (!event.changedTouches.length) {
        touchStart.current = null;
        return;
      }

      const endY =
        event.changedTouches[0].clientY;

      const difference =
        touchStart.current - endY;

      touchStart.current = null;

      if (Math.abs(difference) < 50) return;

      if (isAnimating) return;

      /*
       * Swipe UP = next expert
       */

      if (difference > 0) {
        if (activeIndex < experts.length - 1) {
          changeExpert(1);
        }

        return;
      }

      /*
       * Swipe DOWN = previous expert
       */

      if (difference < 0) {
        if (activeIndex > 0) {
          changeExpert(-1);
        }
      }
    };

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );
    };
  }, [activeIndex, isAnimating]);

  /*
   * SPECIFIC SESSION BOOKING
   */

  const bookSession = (
    expertName: string,
    serviceName: string
  ) => {
    navigateToBooking(
      expertName,
      serviceName
    );
  };

  const navigateToBooking = (
    expertName: string,
    serviceName: string
  ) => {
    const url =
      `/booking?expert=${encodeURIComponent(
        expertName
      )}&service=${encodeURIComponent(
        serviceName
      )}`;

    window.location.href = url;
  };

  return (
    <div className="mt-16">
      {/* ======================================================= */}
      {/* ==================== 3D STAGE ========================= */}
      {/* ======================================================= */}

      <div
        className="relative mx-auto min-h-[900px] w-full max-w-5xl md:min-h-[920px]"
        style={{
          perspective: "1800px",
        }}
      >
        {experts.map((expert, index) => {
          const offset =
            index - activeIndex;

          if (Math.abs(offset) > 2) {
            return null;
          }

          let transform =
            "translate3d(0,0,0)";

          let opacity = 0;
          let zIndex = 0;
          let filter =
            "blur(0px)";

          /*
           * CURRENT
           */

          if (offset === 0) {
            transform =
              "translate3d(0,0,0) rotateY(0deg) scale(1)";

            opacity = 1;
            zIndex = 30;
            filter = "blur(0px)";
          }

          /*
           * NEXT
           * Comes from RIGHT.
           */

          if (offset === 1) {
            transform =
              "translate3d(48%,35px,-260px) rotateY(-32deg) scale(0.82)";

            opacity = 0.48;
            zIndex = 20;
            filter = "blur(1px)";
          }

          /*
           * PREVIOUS
           */

          if (offset === -1) {
            transform =
              "translate3d(-48%,35px,-260px) rotateY(32deg) scale(0.82)";

            opacity = 0.45;
            zIndex = 20;
            filter = "blur(1px)";
          }

          /*
           * FAR NEXT
           */

          if (offset === 2) {
            transform =
              "translate3d(70%,70px,-520px) rotateY(-42deg) scale(0.68)";

            opacity = 0.12;
            zIndex = 10;
            filter = "blur(3px)";
          }

          /*
           * FAR PREVIOUS
           */

          if (offset === -2) {
            transform =
              "translate3d(-70%,70px,-520px) rotateY(42deg) scale(0.68)";

            opacity = 0.12;
            zIndex = 10;
            filter = "blur(3px)";
          }

          return (
            <div
              key={expert.name}
              className="absolute inset-0 flex justify-center"
              style={{
                transform,
                opacity,
                zIndex,
                filter,
                transformStyle: "preserve-3d",
                transition:
                  "transform 850ms cubic-bezier(0.22,1,0.36,1), opacity 650ms ease, filter 650ms ease",
                pointerEvents:
                  offset === 0
                    ? "auto"
                    : "none",
              }}
            >
              {/* ================================================= */}
              {/* ================= CHARACTER CARD ================= */}
              {/* ================================================= */}

              <div
                className="
                  relative
                  h-fit
                  w-full
                  max-w-[720px]
                  overflow-hidden
                  rounded-[2.7rem]
                  border
                  border-[#d4a443]/35
                  bg-[#0d4743]/95
                  shadow-[0_40px_100px_rgba(8,47,45,0.30)]
                  backdrop-blur-2xl
                "
                style={{
                  transformStyle:
                    "preserve-3d",
                }}
              >
                {/* GOLD GLOW */}

                <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#e8a83b]/15 blur-[90px]" />

                <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#0b6a62]/30 blur-[100px]" />

                {/* IMAGE */}

                <div
                  className="
                    relative
                    h-[290px]
                    overflow-hidden
                    bg-[#0d4743]
                    md:h-[360px]
                  "
                >
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="
                      h-full
                      w-full
                      object-contain
                      transition-transform
                      duration-1000
                    "
                    style={{
                      transform:
                        offset === 0
                          ? "scale(1.04)"
                          : "scale(0.98)",
                    }}
                  />

                  {/* IMAGE FADE */}

                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d4743] via-[#0d4743]/60 to-transparent" />

                  {/* EXPERIENCE */}

                  <div
                    className="
                      absolute
                      bottom-5
                      left-5
                      rounded-full
                      border
                      border-[#eab34a]/30
                      bg-[#0d4743]/75
                      px-4
                      py-2
                      text-[11px]
                      font-bold
                      tracking-[0.12em]
                      text-[#eab34a]
                      shadow-xl
                      backdrop-blur-xl
                    "
                  >
                    {expert.experience}
                  </div>
                </div>

                {/* CONTENT */}

                <div className="relative px-6 pb-8 pt-3 md:px-9 md:pb-9">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#eab34a]">
                    {expert.role}
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-white md:text-4xl">
                    {expert.name}
                  </h3>

                  <p className="mt-2 font-semibold text-white/75">
                    {expert.title}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-white/60 md:leading-7">
                    {expert.description}
                  </p>

                  {/* SESSIONS */}

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                      Available Sessions
                    </p>

                    <div className="mt-4 space-y-3">
                      {expert.services.map(
                        ([service, price]) => (
                          <div
                            key={service}
                            className="
                              group/session
                              flex
                              items-center
                              gap-3
                              rounded-2xl
                              border
                              border-white/10
                              bg-white/[0.045]
                              px-4
                              py-3
                              transition
                              hover:border-[#eab34a]/35
                              hover:bg-white/[0.08]
                            "
                          >
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                              <div
                                className="
                                  flex
                                  h-9
                                  w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-[#e8a83b]/15
                                  text-sm
                                  text-[#eab34a]
                                "
                              >
                                ✦
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-white/80">
                                  {service}
                                </p>

                                <p className="mt-0.5 text-xs text-white/35">
                                  Personalised session
                                </p>
                              </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                              <span className="whitespace-nowrap text-sm font-black text-[#eab34a]">
                                {price}
                              </span>

                              {/* DESKTOP BUTTON */}

                              <button
                                type="button"
                                onClick={() =>
                                  bookSession(
                                    expert.name,
                                    service
                                  )
                                }
                                className="
                                  hidden
                                  rounded-full
                                  bg-[#e8a83b]
                                  px-4
                                  py-2
                                  text-xs
                                  font-black
                                  text-[#173d3a]
                                  shadow-lg
                                  transition
                                  hover:bg-[#f2bd58]
                                  sm:block
                                "
                              >
                                Book this session
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* MOBILE BUTTONS */}

                    <div className="mt-4 space-y-2 sm:hidden">
                      {expert.services.map(
                        ([service]) => (
                          <button
                            key={`mobile-${service}`}
                            type="button"
                            onClick={() =>
                              bookSession(
                                expert.name,
                                service
                              )
                            }
                            className="
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-full
                              border
                              border-[#eab34a]/30
                              bg-[#e8a83b]
                              px-5
                              py-3
                              text-sm
                              font-black
                              text-[#173d3a]
                              transition
                              hover:bg-[#f2bd58]
                            "
                          >
                            <span>
                              Book this session
                            </span>

                            <span>
                              →
                            </span>
                          </button>
                        )
                      )}
                    </div>

                    <p className="mt-4 text-xs leading-5 text-white/35">
                      {expert.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================= */}
      {/* ==================== INDICATORS ======================= */}
      {/* ======================================================= */}

      <div className="relative z-40 mt-2 flex items-center justify-center gap-3">
        {experts.map(
          (expert, index) => (
            <button
              key={expert.name}
              type="button"
              onClick={() => {
                if (isAnimating) return;

                if (
                  index === activeIndex
                ) {
                  return;
                }

                setIsAnimating(true);
                setActiveIndex(index);

                window.setTimeout(() => {
                  setIsAnimating(false);
                }, 850);
              }}
              aria-label={`Show ${expert.name}`}
              className={`
                h-2.5
                rounded-full
                transition-all
                duration-500
                ${
                  index === activeIndex
                    ? "w-10 bg-[#e8a83b]"
                    : "w-2.5 bg-[#0d4743]/20"
                }
              `}
            />
          )
        )}
      </div>

      {/* ======================================================= */}
      {/* ===================== SCROLL TEXT ===================== */}
      {/* ======================================================= */}

      <div className="relative z-40 mt-6 text-center">
        {activeIndex <
        experts.length - 1 ? (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#173d3a]/45">
              Scroll to meet the next expert
            </p>

            <div className="mx-auto mt-3 flex justify-center text-xl text-[#c88d22] animate-bounce">
              ↓
            </div>
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#173d3a]/45">
              Our experts are here for you
            </p>

            <div className="mx-auto mt-3 text-xl text-[#c88d22]">
              ✦
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ========================================================= */
/* ====================== SERVICE CARD ===================== */
/* ========================================================= */

function ServiceCard({
  icon,
  title,
  text,
  link,
  button,
}: {
  icon: string;
  title: string;
  text: string;
  link: string;
  button: string;
}) {
  return (
    <div className="group rounded-[2rem] border border-[#e3e8e5] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-600">
        {text}
      </p>

      <Link
        to={link}
        className="mt-7 inline-block font-bold text-[#c88d22]"
      >
        {button}
      </Link>
    </div>
  );
}

export default Home;
