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
  const [activeExpert, setActiveExpert] = useState(0);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.expertIndex
            );

            if (!Number.isNaN(index)) {
              setActiveExpert(index);
            }
          }
        });
      },
      {
        threshold: 0.55,
      }
    );

    const cards = document.querySelectorAll("[data-expert-index]");

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
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

  const experts = [
    {
      image: bossImage,
      experience: "26 YEARS EXPERIENCE",
      role: "Founder / CEO",
      name: "Simon Anand Raj",
      title: "Emotional Intelligence Coach",
      description:
        "Simon Anand Raj is the Founder & CEO and an experienced Emotional Intelligence Coach with 26 years of professional experience in training, coaching, mentoring and human development. His work focuses on helping individuals and organisations develop emotional intelligence, improve self-awareness, strengthen relationships and unlock their potential.",
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

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#173d3a]">
      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
          <div className="rounded-2xl border border-white/15 bg-[#0b3d39]/90 px-4 sm:px-6 py-3 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <Link
                to="/home"
                className="text-xl sm:text-2xl font-black tracking-[0.15em] text-white"
              >
                FREEWILL
              </Link>

              <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-white/80">
                <Link
                  to="/home"
                  className="hover:text-[#eab34a] transition"
                >
                  Home
                </Link>

                <a
                  href="#about"
                  className="hover:text-[#eab34a] transition"
                >
                  About
                </a>

                <a
                  href="#experts"
                  className="hover:text-[#eab34a] transition"
                >
                  Experts
                </a>

                <a
                  href="#services"
                  className="hover:text-[#eab34a] transition"
                >
                  Services
                </a>

                <a
                  href="#process"
                  className="hover:text-[#eab34a] transition"
                >
                  How It Works
                </a>

                <Link
                  to="/booking"
                  className="hover:text-[#eab34a] transition"
                >
                  Appointment
                </Link>
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                {!checkingAuth && !userEmail && (
                  <Link
                    to="/login"
                    className="rounded-full bg-[#e8a83b] px-4 sm:px-6 py-2.5 text-sm font-bold text-[#173d3a] shadow-lg hover:bg-[#f3c15f] transition"
                  >
                    Sign In
                  </Link>
                )}

                {!checkingAuth && userEmail && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full bg-[#e8a83b] px-4 sm:px-6 py-2.5 text-sm font-bold text-[#173d3a] shadow-lg hover:bg-[#f3c15f] transition"
                  >
                    Logout
                  </button>
                )}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((value) => !value)}
                    aria-label="Open menu"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition"
                  >
                    <div className="space-y-1.5">
                      <span className="block h-0.5 w-5 bg-white" />
                      <span className="block h-0.5 w-5 bg-white" />
                      <span className="block h-0.5 w-5 bg-white" />
                    </div>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#0a3b37] text-white">
        <div className="absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full border border-[#eab34a]/10" />

          <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-[#14564f]/60 blur-3xl" />

          <div className="absolute -left-60 bottom-0 h-[550px] w-[550px] rounded-full bg-[#062e2b]/80 blur-3xl" />

          <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#eab34a]/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-36 md:pb-36 md:pt-48">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                <span className="text-[#eab34a]">✦</span>

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  Human Empowerment
                </span>
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#eab34a]">
                FREEWILL
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[1.02] sm:text-6xl md:text-7xl xl:text-8xl">
                Understand
                <br />
                <span className="text-[#eab34a]">Your Mind.</span>
              </h1>

              <div className="mt-6 h-px w-24 bg-[#eab34a]" />

              <h2 className="mt-6 max-w-2xl text-2xl font-semibold leading-tight text-white/90 sm:text-3xl">
                Transform Your Life.
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
                World's First Psycho-Spiritual and Quantum Philosophical
                Training Firm — empowering individuals to understand
                themselves, discover their potential and create meaningful
                transformation.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/assessment"
                  className="rounded-full bg-[#e8a83b] px-7 py-4 font-bold text-[#173d3a] shadow-xl shadow-black/10 hover:bg-[#f2bd58] transition"
                >
                  Take Assessment →
                </Link>

                <Link
                  to="/booking"
                  className="rounded-full border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur hover:bg-white/10 transition"
                >
                  Book Appointment
                </Link>
              </div>

              <div className="mt-12 grid max-w-xl grid-cols-3">
                <div>
                  <p className="text-3xl font-black text-[#eab34a]">
                    100%
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/45">
                    Confidential
                  </p>
                </div>

                <div className="border-l border-white/10 pl-5 sm:pl-8">
                  <p className="text-3xl font-black text-[#eab34a]">
                    360°
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/45">
                    Holistic
                  </p>
                </div>

                <div className="border-l border-white/10 pl-5 sm:pl-8">
                  <p className="text-3xl font-black text-[#eab34a]">
                    24/7
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/45">
                    Access
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[520px] items-center justify-center lg:min-h-[650px]">
              <div className="absolute h-[430px] w-[430px] rounded-full bg-[#14564f] blur-sm md:h-[540px] md:w-[540px]" />

              <div className="absolute h-[350px] w-[350px] rounded-full border border-[#eab34a]/20 md:h-[450px] md:w-[450px]" />

              <div className="absolute h-[270px] w-[270px] rounded-full border border-white/10 md:h-[360px] md:w-[360px]" />

              <img
                src={bossImage}
                alt="FREEWILL Human Empowerment"
                className="relative z-10 max-h-[590px] w-full max-w-[540px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
              />

              <div className="absolute bottom-2 left-0 z-20 max-w-[290px] rounded-3xl border border-white/10 bg-[#062f2c]/95 p-5 shadow-2xl backdrop-blur-xl">
                <p className="font-serif text-4xl leading-none text-[#eab34a]">
                  “
                </p>

                <p className="mt-2 text-sm font-semibold leading-6 text-white">
                  Your journey towards self-understanding starts here.
                </p>

                <p className="mt-3 text-xs text-white/40">
                  FREEWILL Human Empowerment
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[-1px] left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="h-[80px] w-full md:h-[110px]"
            preserveAspectRatio="none"
          >
            <path
              fill="#f5f1e8"
              d="M0 55 C180 105 310 98 460 68 C600 40 665 118 770 118 C900 118 960 45 1080 68 C1210 95 1300 105 1440 55 L1440 120 L0 120 Z"
            />
          </svg>
        </div>
      </section>

      {/* =========================================================
          ABOUT
      ========================================================= */}

      <section
        id="about"
        className="bg-[#f5f1e8] px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c88d22]">
                About FREEWILL
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                A deeper approach to
                <br />
                <span className="text-[#c88d22]">
                  human empowerment.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-gray-600 md:text-lg">
                FREEWILL is focused on helping individuals explore their
                inner world, understand their wellbeing and move towards
                meaningful personal growth.
              </p>

              <p className="mt-5 max-w-xl leading-8 text-gray-600">
                Through self-assessment, professional counselling and
                psycho-spiritual exploration, we create a space where people
                can pause, understand and take their next step.
              </p>

              <Link
                to="/assessment"
                className="mt-8 inline-flex rounded-full bg-[#0d4743] px-7 py-4 font-bold text-white hover:bg-[#12554f] transition"
              >
                Discover Yourself →
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[3rem] bg-[#e7d8b9]" />

              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d4743]">
                <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full border border-[#eab34a]/20" />

                <img
                  src={bossImage}
                  alt="FREEWILL Founder"
                  className="relative z-10 mx-auto h-[440px] w-full object-contain p-5"
                />

                <div className="border-t border-white/10 px-8 py-6 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#eab34a]">
                    Founder / Human Empowerment
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    FREEWILL
                  </h3>

                  <p className="mt-2 text-sm text-white/50">
                    Empowering people to understand themselves better.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY FREEWILL
      ========================================================= */}

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c88d22]">
              Why FREEWILL
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              Designed around you.
            </h2>

            <p className="mt-5 max-w-2xl text-gray-600">
              A simple, confidential and supportive experience built around
              awareness, professional guidance and personal growth.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <FeatureCard
              number="01"
              icon="🧠"
              title="Understand Yourself"
              text="Explore your thoughts, emotions and wellbeing through simple self-assessment tools."
            />

            <FeatureCard
              number="02"
              icon="💬"
              title="Get Professional Support"
              text="Connect with counselling professionals when you need guidance and support."
            />

            <FeatureCard
              number="03"
              icon="🌱"
              title="Grow With Purpose"
              text="Turn awareness into meaningful action and create a more empowered direction for your life."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          QUOTE
      ========================================================= */}

      <section className="bg-[#e9dfca] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-[#0d4743] text-4xl leading-[60px] text-[#eab34a]">
            “
          </div>

          <h2 className="mt-8 text-4xl font-black leading-tight md:text-6xl">
            The first step towards
            <br />
            transformation is{" "}
            <span className="text-[#c88d22]">
              understanding.
            </span>
          </h2>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-[#173d3a]/50">
            FREEWILL — Human Empowerment
          </p>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================= */}

      <section
        id="process"
        className="bg-[#0a3b37] px-6 py-24 text-white md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#eab34a]">
              Your Journey
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              Three simple steps.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
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
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
              >
                <span className="text-6xl font-black text-[#eab34a]/90">
                  {num}
                </span>

                <h3 className="mt-7 text-2xl font-bold">
                  {title}
                </h3>

                <p className="mt-4 leading-7 text-white/55">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          EXPERTS
      ========================================================= */}

      <section
        id="experts"
        className="bg-[#f5f1e8] px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c88d22]">
              Meet Our Experts
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Guidance from experienced professionals.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Connect with experienced professionals who bring expertise,
              compassion and practical guidance to your personal growth
              journey.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {experts.map((expert, index) => (
              <div
                key={expert.name}
                data-expert-index={index}
                className={`group overflow-hidden rounded-[2.5rem] border border-[#ddd5c6] bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  activeExpert === index
                    ? "ring-1 ring-[#eab34a]/30"
                    : ""
                }`}
              >
                <div
                  className={`relative h-[380px] overflow-hidden ${
                    expert.light
                      ? "bg-[#efe4cf]"
                      : "bg-[#0d4743]"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                  <img
                    src={expert.image}
                    alt={expert.name}
                    className={`relative z-10 h-full w-full transition duration-700 group-hover:scale-105 ${
                      expert.light
                        ? "object-cover"
                        : "object-contain"
                    }`}
                  />

                  <div className="absolute bottom-5 left-5 z-20 rounded-full bg-[#e8a83b] px-4 py-2 text-xs font-black text-[#173d3a]">
                    {expert.experience}
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                    {expert.role}
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-[#173d3a]">
                    {expert.name}
                  </h3>

                  <p className="mt-2 font-semibold text-gray-700">
                    {expert.title}
                  </p>

                  <p className="mt-4 text-sm font-medium text-gray-400">
                    Training, Counselling & Coaching
                  </p>

                  <p className="mt-5 text-sm leading-7 text-gray-600">
                    {expert.description}
                  </p>

                  <div className="mt-7 border-t border-gray-100 pt-6">
                    <p className="text-xs font-black uppercase tracking-wider text-gray-400">
                      Services
                    </p>

                    <div className="mt-4 space-y-3">
                      {expert.services.map(([service, price]) => (
                        <div
                          key={`${expert.name}-${service}`}
                          className="rounded-2xl bg-[#f8f6f0] p-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-gray-700">
                              {service}
                            </span>

                            <span className="text-sm font-black text-[#173d3a]">
                              {price}
                            </span>
                          </div>

                          <Link
                            to={`/booking?expert=${encodeURIComponent(
                              expert.name
                            )}&service=${encodeURIComponent(
                              service
                            )}&price=${encodeURIComponent(
                              price
                            )}`}
                            className="mt-3 block rounded-full border border-[#0d4743]/15 px-4 py-2 text-center text-xs font-bold text-[#0d4743] hover:bg-[#0d4743] hover:text-white transition"
                          >
                            Book this session →
                          </Link>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 text-xs leading-5 text-gray-400">
                      {expert.note}
                    </p>
                  </div>

                  <Link
                    to={`/booking?expert=${encodeURIComponent(
                      expert.name
                    )}`}
                    className="mt-7 block rounded-full bg-[#0d4743] px-6 py-4 text-center font-bold text-white hover:bg-[#12554f] transition"
                  >
                    {expert.button}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}

      <section
        id="services"
        className="bg-white px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c88d22]">
              What We Do
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              Our Services
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <ServiceCard
              icon="🧠"
              number="01"
              title="Mental Wellness Assessment"
              text="Take a simple assessment and receive an instant wellbeing result."
              link="/assessment"
              button="Start Assessment →"
            />

            <ServiceCard
              icon="💬"
              number="02"
              title="Professional Counselling"
              text="Connect with trained professionals for personalised support and guidance."
              link="/booking"
              button="Book Appointment →"
            />

            <ServiceCard
              icon="📅"
              number="03"
              title="Manage Appointments"
              text="View and manage your counselling appointments easily from your account."
              link="/dashboard"
              button="My Appointments →"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="bg-[#f5f1e8] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#0a3b37] px-7 py-16 text-center md:px-16 md:py-20">
            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#eab34a]/10" />

            <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[#14564f] blur-3xl" />

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#eab34a]">
                Begin Today
              </p>

              <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
                Ready to understand yourself better?
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
                Take the first step towards greater self-awareness,
                wellbeing and personal empowerment.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link
                  to="/assessment"
                  className="rounded-full bg-[#e8a83b] px-8 py-4 font-bold text-[#173d3a] hover:bg-[#f2bd58] transition"
                >
                  Take Assessment
                </Link>

                <Link
                  to="/booking"
                  className="rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white hover:bg-white/10 transition"
                >
                  Book Counselling
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#062f2c] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-3xl font-black tracking-wide">
                FREEWILL
              </h3>

              <p className="mt-2 font-semibold text-[#eab34a]">
                Human Empowerment
              </p>

              <p className="mt-5 max-w-sm leading-7 text-white/45">
                World's First Psycho-Spiritual and Quantum Philosophical
                Training Firm.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white">
                Quick Links
              </h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/45">
                <Link
                  to="/home"
                  className="hover:text-white transition"
                >
                  Home
                </Link>

                <a
                  href="#about"
                  className="hover:text-white transition"
                >
                  About
                </a>

                <a
                  href="#experts"
                  className="hover:text-white transition"
                >
                  Experts
                </a>

                <a
                  href="#services"
                  className="hover:text-white transition"
                >
                  Services
                </a>

                <Link
                  to="/assessment"
                  className="hover:text-white transition"
                >
                  Assessment
                </Link>

                <Link
                  to="/booking"
                  className="hover:text-white transition"
                >
                  Appointment
                </Link>

                {!userEmail && (
                  <Link
                    to="/login"
                    className="hover:text-white transition"
                  >
                    Sign In
                  </Link>
                )}

                {userEmail && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left hover:text-white transition"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white">
                Start Your Journey
              </h4>

              <p className="mt-5 leading-7 text-white/45">
                Take a meaningful first step towards understanding
                yourself better.
              </p>

              <Link
                to="/assessment"
                className="mt-6 inline-flex rounded-full bg-[#e8a83b] px-6 py-3 font-bold text-[#173d3a] hover:bg-[#f2bd58] transition"
              >
                Get Started →
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-7 text-center">
            <p className="text-xs text-white/30">
              © 2026 FREEWILL. All rights reserved.
            </p>

            <a
              href="https://www.instagram.com/ragul_arunan/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[11px] font-serif tracking-wide text-white/20 hover:text-white/50 transition"
            >
              𝓡𝓪𝓰𝓾𝓵 𝓐𝓻𝓾𝓷𝓪𝓷
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-[2.5rem] border border-[#e3e7e4] bg-[#f8faf9] p-8 transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d4743] text-2xl">
          {icon}
        </div>

        <span className="text-sm font-black text-[#c88d22]">
          {number}
        </span>
      </div>

      <h3 className="mt-8 text-2xl font-black text-[#173d3a]">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-600">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   SERVICE CARD
========================================================= */

function ServiceCard({
  icon,
  number,
  title,
  text,
  link,
  button,
}: {
  icon: string;
  number: string;
  title: string;
  text: string;
  link: string;
  button: string;
}) {
  return (
    <div className="group rounded-[2.5rem] border border-[#e1e6e3] bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="text-4xl">{icon}</div>

        <span className="text-sm font-black text-[#c88d22]">
          {number}
        </span>
      </div>

      <h3 className="mt-7 text-2xl font-black text-[#173d3a]">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-600">
        {text}
      </p>

      <Link
        to={link}
        className="mt-7 inline-flex rounded-full bg-[#f4ead5] px-5 py-3 text-sm font-bold text-[#9b6d18] hover:bg-[#0d4743] hover:text-white transition"
      >
        {button}
      </Link>
    </div>
  );
}

export default Home;
