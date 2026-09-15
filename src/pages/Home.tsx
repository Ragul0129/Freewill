import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import bossImage from "../assets/boss.png";
import jeevithaImage from "../assets/jeevitha.png";
import rahulImage from "../assets/rahul.png";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Expert = {
  name: string;
  role: string;
  experience: string;
  image: string;
  description: string;
  services: {
    title: string;
    price: string;
  }[];
  note: string;
  button: string;
};

function ServiceCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300/30 hover:bg-white/[0.07]">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-2xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-gray-400">
        {description}
      </p>

      <div className="mt-6 h-px w-12 bg-gradient-to-r from-emerald-300 to-yellow-300 transition-all duration-500 group-hover:w-24" />
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [expertIndex, setExpertIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const experts: Expert[] = useMemo(
    () => [
      {
        name: "Simon Anand Raj",
        role: "Founder / CEO · Emotional Intelligence Coach",
        experience: "26 Years Experience",
        image: bossImage,
        description:
          "A transformational mentor helping individuals develop emotional intelligence, inner clarity, confidence and conscious living.",
        services: [
          {
            title: "One Hour",
            price: "₹1,500",
          },
          {
            title: "Psychometric Analysis",
            price: "₹2,500",
          },
          {
            title: "One-to-One Session",
            price: "₹3,000",
          },
          {
            title: "Training Sessions",
            price: "₹12,000",
          },
          {
            title: "Mentoring",
            price: "₹25,000",
          },
        ],
        note:
          "Extended sessions and specialised programs may range from ₹5,000 to ₹50,000.",
        button: "Book a Session →",
      },
      {
        name: "Jeevitha S",
        role: "Clinical Psychologist & Project Head",
        experience: "5 Years Experience",
        image: jeevithaImage,
        description:
          "Supporting individuals through emotional challenges, psychological wellbeing, stress management and personal development.",
        services: [
          {
            title: "One Hour",
            price: "₹1,500",
          },
          {
            title: "Psychometric Analysis",
            price: "₹2,500",
          },
          {
            title: "One-to-One Session",
            price: "₹3,000",
          },
          {
            title: "Training Sessions",
            price: "₹12,000",
          },
          {
            title: "Mentoring",
            price: "₹25,000",
          },
        ],
        note:
          "Session pricing may range from ₹1,000 to ₹10,000 depending on the service.",
        button: "Book a Session →",
      },
      {
        name: "Rahul K.P",
        role: "Life Coach & Content Head",
        experience: "7 Years Experience",
        image: rahulImage,
        description:
          "Helping individuals improve focus, personal development, life direction and meaningful growth through practical coaching.",
        services: [
          {
            title: "Focus",
            price: "Life Coaching",
          },
          {
            title: "Training",
            price: "Personal Development",
          },
          {
            title: "Content",
            price: "Content Management",
          },
        ],
        note:
          "Service pricing will be available based on the selected program.",
        button: "Explore & Book →",
      },
    ],
    []
  );

  useEffect(() => {
    let mounted = true;

    const loadAuth = async () => {
      try {
        setCheckingAuth(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!mounted) return;

        if (!user) {
          setUserEmail("");
          setUserRole("");
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

        setUserRole(profile?.role || "user");
      } catch (error) {
        console.error("Home auth error:", error);

        if (mounted) {
          setUserEmail("");
          setUserRole("");
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    loadAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      if (!session?.user) {
        setUserEmail("");
        setUserRole("");
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

      setUserRole(profile?.role || "user");
      setCheckingAuth(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      setMenuOpen(false);

      await supabase.auth.signOut();

      setUserEmail("");
      setUserRole("");

      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      alert("Unable to logout. Please try again.");
    }
  };

  const openLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const goToBooking = (serviceName?: string) => {
    setMenuOpen(false);

    if (serviceName) {
      navigate(
        `/booking?serviceName=${encodeURIComponent(serviceName)}`
      );
    } else {
      navigate("/booking");
    }
  };

  const goToProtectedPage = (path: string) => {
    setMenuOpen(false);

    if (!userEmail) {
      navigate(
        `/login?redirect=${encodeURIComponent(path)}`
      );
      return;
    }

    navigate(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("experts-section");

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalScroll =
        section.offsetHeight - viewportHeight;

      const currentScroll = Math.min(
        Math.max(-rect.top, 0),
        Math.max(totalScroll, 1)
      );

      const progress =
        totalScroll > 0
          ? currentScroll / totalScroll
          : 0;

      const totalTransitions = experts.length - 1;

      const carouselPosition =
        progress * totalTransitions;

      const current = Math.round(carouselPosition);

      setScrollProgress(carouselPosition);
      setExpertIndex(
        Math.min(
          Math.max(current, 0),
          experts.length - 1
        )
      );
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [experts.length]);

  const getExpertTransform = (index: number) => {
    const offset = index - scrollProgress;

    const absOffset = Math.abs(offset);

    const translateX = offset * 110;

    const translateZ =
      -Math.min(absOffset, 2) * 180;

    const rotateY =
      Math.max(
        Math.min(offset * -32, 60),
        -60
      );

    const scale =
      1 - Math.min(absOffset, 1) * 0.08;

    const opacity =
      absOffset >= 1.8
        ? 0
        : Math.max(
            0.12,
            1 - absOffset * 0.72
          );

    const blur =
      absOffset > 0.8
        ? Math.min(absOffset * 1.2, 3)
        : 0;

    return {
      transform: `
        translateX(${translateX}%)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: 100 - Math.round(absOffset * 10),
    };
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020806] text-white">
      {/* ================= GLOBAL BACKGROUND ================= */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[130px]" />
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/[0.03] blur-[120px]" />
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="fixed left-0 right-0 top-0 z-[100] border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* LOGO */}
          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="group"
          >
            <div className="text-xl font-black tracking-[0.22em] text-white transition group-hover:text-emerald-300 sm:text-2xl">
              FREEWILL
            </div>

            <div className="mt-1 text-[8px] tracking-[0.28em] text-emerald-300 uppercase sm:text-[9px]">
              Human Empowerment
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              to="/home"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Home
            </Link>

            <a
              href="#about"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              About
            </a>

            <a
              href="#experts-section"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Experts
            </a>

            <a
              href="#services"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Services
            </a>

            <Link
              to="/assessment"
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Assessment
            </Link>
          </nav>

          {/* RIGHT NAV */}
          <div className="flex items-center gap-2">
            {/* SIGN IN / LOGOUT */}
            {!checkingAuth && !userEmail && (
              <button
                onClick={openLogin}
                className="hidden rounded-full border border-emerald-300/30 bg-emerald-300/10 px-5 py-2.5 text-sm font-semibold text-emerald-200 transition hover:border-emerald-200/60 hover:bg-emerald-300/20 sm:block"
              >
                Sign In
              </button>
            )}

            {!checkingAuth && userEmail && (
              <button
                onClick={handleLogout}
                className="hidden rounded-full border border-red-300/20 bg-red-300/10 px-5 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-300/20 sm:block"
              >
                Logout
              </button>
            )}

            {/* THREE LINE MENU */}
            <button
              onClick={() =>
                setMenuOpen((value) => !value)
              }
              aria-label="Open menu"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.05] transition hover:border-emerald-300/30 hover:bg-white/[0.09]"
            >
              <span
                className={`h-0.5 w-5 bg-white transition ${
                  menuOpen
                    ? "translate-y-2 rotate-45"
                    : ""
                }`}
              />

              <span
                className={`h-0.5 w-5 bg-white transition ${
                  menuOpen
                    ? "opacity-0"
                    : ""
                }`}
              />

              <span
                className={`h-0.5 w-5 bg-white transition ${
                  menuOpen
                    ? "-translate-y-2 -rotate-45"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ================= MOBILE / ROLE MENU ================= */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#020806]/95 px-5 py-5 backdrop-blur-3xl">
            <div className="mx-auto max-w-7xl">
              {/* LOGGED OUT MENU */}
              {!userEmail && (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  <button
                    onClick={() =>
                      goToProtectedPage("/dashboard")
                    }
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                  >
                    🏠 Dashboard
                  </button>

                  <button
                    onClick={() =>
                      goToProtectedPage(
                        "/my-appointments"
                      )
                    }
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                  >
                    📅 My Appointments
                  </button>

                  <a
                    href="https://wa.me/919360694756"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                  >
                    💬 WhatsApp
                  </a>

                  <a
                    href="https://www.instagram.com/simonanandhraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                  >
                    📸 Instagram
                  </a>
                </div>
              )}

              {/* NORMAL USER MENU */}
              {userEmail &&
                userRole === "user" && (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                        Signed In
                      </div>

                      <div className="mt-1 break-all text-sm font-medium text-white">
                        {userEmail}
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                      <button
                        onClick={() =>
                          goToProtectedPage(
                            "/dashboard"
                          )
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                      >
                        🏠 Dashboard
                      </button>

                      <button
                        onClick={() =>
                          goToProtectedPage(
                            "/my-appointments"
                          )
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                      >
                        📅 My Appointments
                      </button>

                      <a
                        href="https://wa.me/919360694756"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                      >
                        💬 WhatsApp
                      </a>

                      <a
                        href="https://www.instagram.com/simonanandhraj"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                      >
                        📸 Instagram
                      </a>

                      <button
                        onClick={handleLogout}
                        className="rounded-xl border border-red-300/20 bg-red-300/[0.05] px-4 py-3 text-left text-sm text-red-200 transition hover:bg-red-300/10"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}

              {/* EXPERT MENU */}
              {userEmail &&
                userRole === "expert" && (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                        Expert Account
                      </div>

                      <div className="mt-1 break-all text-sm font-medium text-white">
                        {userEmail}
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
                      <button
                        onClick={() =>
                          goToProtectedPage(
                            "/expert-dashboard"
                          )
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                      >
                        📊 Expert Dashboard
                      </button>

                      <button
                        onClick={() =>
                          goToProtectedPage(
                            "/expert-profile"
                          )
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                      >
                        👤 My Profile
                      </button>

                      <button
                        onClick={() =>
                          goToProtectedPage(
                            "/expert-services"
                          )
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                      >
                        🧩 My Services
                      </button>

                      <a
                        href="https://wa.me/919360694756"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                      >
                        💬 WhatsApp
                      </a>

                      <a
                        href="https://www.instagram.com/simonanandhraj"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          setMenuOpen(false)
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-emerald-300/30 hover:text-white"
                      >
                        📸 Instagram
                      </a>

                      <button
                        onClick={handleLogout}
                        className="rounded-xl border border-red-300/20 bg-red-300/[0.05] px-4 py-3 text-left text-sm text-red-200 transition hover:bg-red-300/10"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}

              {/* ADMIN MENU */}
              {userEmail &&
                userRole === "admin" && (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-yellow-300/10 bg-yellow-300/[0.04] px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-yellow-300">
                        Administrator
                      </div>

                      <div className="mt-1 break-all text-sm font-medium text-white">
                        {userEmail}
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <button
                        onClick={() =>
                          goToProtectedPage(
                            "/admin-dashboard"
                          )
                        }
                        className="rounded-xl border border-yellow-300/20 bg-yellow-300/[0.05] px-4 py-3 text-left text-sm text-yellow-100 transition hover:bg-yellow-300/10"
                      >
                        🛡️ Admin Dashboard
                      </button>

                      <button
                        onClick={handleLogout}
                        className="rounded-xl border border-red-300/20 bg-red-300/[0.05] px-4 py-3 text-left text-sm text-red-200 transition hover:bg-red-300/10"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <main className="relative z-10 pt-20">
        <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-4 py-2 text-xs uppercase tracking-[0.22em] text-emerald-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                Human Empowerment
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Your Mind.
                <br />
                Your Choice.
                <br />
                <span className="bg-gradient-to-r from-emerald-300 via-yellow-200 to-emerald-200 bg-clip-text text-transparent">
                  Your FREEWILL.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                Discover your emotional wellbeing, understand
                yourself better and begin a journey towards
                conscious personal transformation.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/assessment"
                  className="rounded-full bg-gradient-to-r from-emerald-400 to-yellow-300 px-7 py-3.5 text-center text-sm font-bold text-black transition hover:scale-[1.02]"
                >
                  Start Assessment
                </Link>

                <a
                  href="#experts-section"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:border-emerald-300/40 hover:bg-white/[0.07]"
                >
                  Meet Our Experts
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xl font-bold text-white">
                    10+
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Assessment Areas
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xl font-bold text-white">
                    3
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Expert Coaches
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xl font-bold text-white">
                    1
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Personal Journey
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute inset-10 rounded-full bg-emerald-400/10 blur-[100px]" />

              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl">
                <div className="relative overflow-hidden rounded-[2rem]">
                  <img
                    src={bossImage}
                    alt="FREEWILL Founder"
                    className="h-[560px] w-full object-cover object-top"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-7 pt-32">
                    <div className="text-xs uppercase tracking-[0.25em] text-emerald-300">
                      Founder / CEO
                    </div>

                    <h2 className="mt-2 text-2xl font-bold">
                      Simon Anand Raj
                    </h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Emotional Intelligence Coach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
        >
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                About FREEWILL
              </div>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Understand yourself.
                <br />
                <span className="text-emerald-300">
                  Empower yourself.
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-gray-400">
              <p className="leading-8">
                FREEWILL is built around a simple belief:
                meaningful transformation begins with
                understanding yourself.
              </p>

              <p className="leading-8">
                Through self-assessment, emotional awareness,
                psychological guidance and personal mentoring,
                we help individuals understand the challenges
                affecting their everyday life.
              </p>

              <p className="leading-8">
                From educational and workplace stress to
                anxiety, wellbeing, sleep and family concerns,
                FREEWILL creates a space where your mind can be
                understood without judgement.
              </p>
            </div>
          </div>
        </section>

        {/* ================= WHY FREEWILL ================= */}
        <section className="border-y border-white/5 bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                Why FREEWILL
              </div>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                A journey designed around
                <span className="text-emerald-300">
                  {" "}
                  you.
                </span>
              </h2>

              <p className="mt-5 leading-8 text-gray-400">
                Not every person experiences stress, emotions or
                life challenges in the same way. FREEWILL brings
                assessment and human guidance together to create
                a more meaningful journey.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <ServiceCard
                icon="🧠"
                title="Self Awareness"
                description="Understand your thoughts, emotions, behavioural patterns and personal strengths."
              />

              <ServiceCard
                icon="🌱"
                title="Wellbeing"
                description="Build healthier emotional habits and create a stronger foundation for everyday life."
              />

              <ServiceCard
                icon="🤝"
                title="Human Guidance"
                description="Connect with experienced experts when you need deeper personal support."
              />

              <ServiceCard
                icon="✨"
                title="Transformation"
                description="Turn awareness into practical action and move towards meaningful personal growth."
              />
            </div>
          </div>
        </section>

        {/* ================= QUOTE ================= */}
        <section className="mx-auto max-w-5xl px-5 py-24 text-center">
          <div className="text-5xl text-emerald-300/60">
            “
          </div>

          <blockquote className="mt-2 text-3xl font-medium leading-relaxed text-gray-200 sm:text-4xl">
            The journey towards change begins when you are
            willing to understand yourself.
          </blockquote>

          <div className="mx-auto mt-7 h-px w-20 bg-gradient-to-r from-emerald-300 to-yellow-300" />

          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-gray-500">
            FREEWILL · Human Empowerment
          </p>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="border-y border-white/5 bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                How It Works
              </div>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Your journey in
                <span className="text-emerald-300">
                  {" "}
                  four steps.
                </span>
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Assess",
                  text: "Take the FREEWILL self-assessment and understand your current wellbeing.",
                },
                {
                  number: "02",
                  title: "Understand",
                  text: "Explore your result and identify areas that may need attention.",
                },
                {
                  number: "03",
                  title: "Connect",
                  text: "Choose an expert and service that fits your personal journey.",
                },
                {
                  number: "04",
                  title: "Transform",
                  text: "Work with your expert and turn awareness into meaningful action.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-3xl border border-white/10 bg-black/20 p-7"
                >
                  <div className="text-sm font-black tracking-[0.2em] text-emerald-300">
                    {step.number}
                  </div>

                  <h3 className="mt-5 text-2xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= EXPERTS 3D CAROUSEL ================= */}
        <section
          id="experts-section"
          className="relative h-[320vh]"
        >
          <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.04] blur-[120px]" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
              {/* SECTION HEADER */}
              <div className="mb-6 text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                  Our Experts
                </div>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  Meet the people behind your
                  <span className="text-emerald-300">
                    {" "}
                    journey.
                  </span>
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
                  Scroll down to move through our expert
                  character cards.
                </p>
              </div>

              {/* 3D STAGE */}
              <div
                className="relative mx-auto h-[68vh] max-h-[720px] w-full max-w-5xl"
                style={{
                  perspective: "1600px",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {experts.map((expert, index) => {
                    const style =
                      getExpertTransform(index);

                    return (
                      <div
                        key={expert.name}
                        className="absolute left-1/2 top-1/2 h-full w-[94%] max-w-4xl -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity,filter] duration-100 ease-out sm:w-[88%]"
                        style={{
                          ...style,
                          transformOrigin:
                            "center center",
                          transformStyle:
                            "preserve-3d",
                          pointerEvents:
                            index === expertIndex
                              ? "auto"
                              : "none",
                        }}
                      >
                        <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#07100c]/95 shadow-2xl">
                          {/* CARD GLOW */}
                          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-300/10 blur-[90px]" />

                          <div className="grid h-full md:grid-cols-[38%_62%]">
                            {/* IMAGE */}
                            <div className="relative min-h-[250px] overflow-hidden md:min-h-0">
                              <img
                                src={expert.image}
                                alt={expert.name}
                                className="h-full w-full object-cover object-top"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-[#07100c] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#07100c]" />

                              <div className="absolute bottom-5 left-5 right-5 md:hidden">
                                <div className="text-[10px] uppercase tracking-[0.25em] text-emerald-300">
                                  {expert.experience}
                                </div>

                                <h3 className="mt-1 text-2xl font-black">
                                  {expert.name}
                                </h3>
                              </div>
                            </div>

                            {/* CONTENT */}
                            <div className="flex min-h-0 flex-col p-5 sm:p-7">
                              <div className="hidden md:block">
                                <div className="text-[10px] uppercase tracking-[0.25em] text-emerald-300">
                                  {expert.experience}
                                </div>

                                <h3 className="mt-1 text-3xl font-black">
                                  {expert.name}
                                </h3>

                                <p className="mt-1 text-sm text-emerald-200/80">
                                  {expert.role}
                                </p>
                              </div>

                              <p className="mt-4 text-xs leading-6 text-gray-400 sm:text-sm">
                                {expert.description}
                              </p>

                              <div className="my-4 h-px bg-white/10" />

                              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                                <div className="grid gap-2">
                                  {expert.services.map(
                                    (service) => (
                                      <div
                                        key={service.title}
                                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.04]"
                                      >
                                        <div className="min-w-0">
                                          <div className="text-xs font-semibold text-white sm:text-sm">
                                            {service.title}
                                          </div>

                                          <div className="mt-1 text-xs text-gray-500">
                                            {service.price}
                                          </div>
                                        </div>

                                        <button
                                          onClick={() =>
                                            goToBooking(
                                              service.title
                                            )
                                          }
                                          className="shrink-0 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-[10px] font-bold text-emerald-200 transition hover:border-emerald-200/60 hover:bg-emerald-300/20 sm:px-4 sm:text-xs"
                                        >
                                          Book this session
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <p className="mt-3 text-[10px] leading-5 text-gray-600">
                                {expert.note}
                              </p>

                              <button
                                onClick={() =>
                                  goToBooking()
                                }
                                className="mt-3 w-full rounded-xl bg-gradient-to-r from-emerald-400 to-yellow-300 py-3 text-xs font-black text-black transition hover:scale-[1.01]"
                              >
                                {expert.button}
                              </button>
                            </div>
                          </div>

                          {/* CHARACTER CARD NUMBER */}
                          <div className="pointer-events-none absolute right-5 top-5 text-5xl font-black text-white/[0.04]">
                            0{index + 1}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CAROUSEL INDICATORS */}
              <div className="mt-5 flex items-center justify-center gap-2">
                {experts.map((expert, index) => (
                  <div
                    key={expert.name}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === expertIndex
                        ? "w-10 bg-emerald-300"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-gray-600">
                {expertIndex + 1} / {experts.length}
              </div>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section
          id="services"
          className="border-y border-white/5 bg-white/[0.015]"
        >
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                Services
              </div>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Support for different
                <span className="text-emerald-300">
                  {" "}
                  stages of life.
                </span>
              </h2>

              <p className="mt-5 leading-8 text-gray-400">
                Explore areas where FREEWILL can help you
                understand challenges and move towards better
                emotional wellbeing.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                icon="🎓"
                title="Educational Stress"
                description="Support for students dealing with academic pressure, exams, expectations and uncertainty."
              />

              <ServiceCard
                icon="💼"
                title="Workplace Stress"
                description="Understand workplace pressure, burnout, emotional exhaustion and professional challenges."
              />

              <ServiceCard
                icon="🌊"
                title="Anxiety"
                description="Explore emotional patterns and learn healthier ways of handling anxiety and overwhelming thoughts."
              />

              <ServiceCard
                icon="🌧️"
                title="Depression"
                description="A safe space to understand emotional heaviness, low motivation and difficult periods in life."
              />

              <ServiceCard
                icon="🌿"
                title="Well-being"
                description="Build awareness around your emotional, mental and personal wellbeing."
              />

              <ServiceCard
                icon="🌙"
                title="Sleep"
                description="Understand stress-related sleep challenges and their impact on everyday wellbeing."
              />

              <ServiceCard
                icon="❤️"
                title="Family Issues"
                description="Explore emotional challenges connected with relationships, family expectations and communication."
              />

              <ServiceCard
                icon="🧭"
                title="Personal Growth"
                description="Develop clarity, confidence and awareness to move towards meaningful personal growth."
              />

              <ServiceCard
                icon="✨"
                title="Life Direction"
                description="Get support when you feel confused about your goals, decisions, identity or future."
              />
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-300/[0.08] via-white/[0.03] to-yellow-300/[0.06] p-8 text-center sm:p-14">
            <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-300/10 blur-[90px]" />

            <div className="relative">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                Begin Your Journey
              </div>

              <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black sm:text-5xl">
                Sometimes the first step is simply
                <span className="text-emerald-300">
                  {" "}
                  understanding yourself.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-400">
                Take the FREEWILL assessment and discover
                where you are today.
              </p>

              <Link
                to="/assessment"
                className="mt-8 inline-flex rounded-full bg-gradient-to-r from-emerald-400 to-yellow-300 px-8 py-4 text-sm font-black text-black transition hover:scale-[1.02]"
              >
                Take Your Assessment →
              </Link>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-white/10 bg-black/30">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="text-2xl font-black tracking-[0.2em]">
                  FREEWILL
                </div>

                <div className="mt-2 text-xs uppercase tracking-[0.25em] text-emerald-300">
                  Human Empowerment
                </div>

                <p className="mt-5 text-sm leading-7 text-gray-500">
                  Your journey. Your mind. Your FREEWILL.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Explore
                </h3>

                <div className="mt-4 space-y-3 text-sm text-gray-500">
                  <Link
                    to="/home"
                    className="block transition hover:text-white"
                  >
                    Home
                  </Link>

                  <Link
                    to="/assessment"
                    className="block transition hover:text-white"
                  >
                    Assessment
                  </Link>

                  <a
                    href="#experts-section"
                    className="block transition hover:text-white"
                  >
                    Experts
                  </a>

                  <a
                    href="#services"
                    className="block transition hover:text-white"
                  >
                    Services
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Connect
                </h3>

                <div className="mt-4 space-y-3 text-sm text-gray-500">
                  <a
                    href="https://wa.me/919360694756"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition hover:text-white"
                  >
                    WhatsApp
                  </a>

                  <a
                    href="https://www.instagram.com/simonanandhraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition hover:text-white"
                  >
                    Instagram
                  </a>

                  <a
                    href="tel:+919841624060"
                    className="block transition hover:text-white"
                  >
                    +91 98416 24060
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Founder
                </h3>

                <div className="mt-4 text-sm text-gray-500">
                  <div className="font-semibold text-gray-300">
                    Simon Anand Raj
                  </div>

                  <div className="mt-1">
                    Founder / CEO
                  </div>

                  <div>
                    Emotional Intelligence Coach
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-white/10 pt-7 text-center text-xs text-gray-600">
              © {new Date().getFullYear()} FREEWILL –
              Human Empowerment. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
