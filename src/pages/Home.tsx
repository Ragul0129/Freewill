import { useState } from "react";
import { Link } from "react-router-dom";

import bossImage from "../assets/boss.png";
import jeevithaImage from "../assets/jeevitha.png";
import rahulImage from "../assets/rahul.png";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

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
              <Link to="/home" className="hover:text-[#e9ad3d] transition">
                Home
              </Link>
              <a href="#about" className="hover:text-[#e9ad3d] transition">
                About
              </a>
              <a href="#experts" className="hover:text-[#e9ad3d] transition">
                Experts
              </a>
              <a href="#services" className="hover:text-[#e9ad3d] transition">
                Services
              </a>
              <a href="#process" className="hover:text-[#e9ad3d] transition">
                How It Works
              </a>
              <Link to="/booking" className="hover:text-[#e9ad3d] transition">
                Appointment
              </Link>
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">

              {/* DASHBOARD */}
              <Link
                to="/dashboard"
                className="hidden sm:block rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition"
              >
                Dashboard
              </Link>

              {/* LOGIN */}
              <Link
                to="/login"
                className="hidden sm:block rounded-full bg-[#e8a83b] px-6 py-3 text-sm font-bold text-[#173d3a] shadow-lg hover:bg-[#f2bd58] transition"
              >
                Login / Sign Up
              </Link>

              {/* MENU */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
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

                    <div className="border-b border-gray-100 bg-[#f7f4ed] px-5 py-4">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                        FREEWILL
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#173d3a]">
                        Human Empowerment
                      </p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                    >
                      📊 <span>Dashboard</span>
                    </Link>

                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                    >
                      🔐 <span>Login / Sign Up</span>
                    </Link>

                    <a
                      href="https://wa.me/919841624060"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                    >
                      🟢 <span>WhatsApp</span>
                    </a>

                    <a
                      href="https://www.instagram.com/simonanandhraj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm font-semibold hover:bg-[#f7f4ed] transition"
                    >
                      📸 <span>Instagram</span>
                    </a>

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
                  <p className="text-2xl font-black text-[#eab34a]">100%</p>
                  <p className="mt-1 text-xs text-white/60">Confidential</p>
                </div>

                <div className="border-l border-white/20 pl-8">
                  <p className="text-2xl font-black text-[#eab34a]">360°</p>
                  <p className="mt-1 text-xs text-white/60">
                    Holistic Approach
                  </p>
                </div>

                <div className="border-l border-white/20 pl-8">
                  <p className="text-2xl font-black text-[#eab34a]">24/7</p>
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
                <p className="text-3xl font-serif text-[#eab34a]">“</p>
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

      {/* ================= WHY ================= */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              Why FREEWILL
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black">
              Designed Around You
            </h2>
            <p className="mt-4 text-gray-600">
              A simple, confidential and supportive experience.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-7">

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
                <h3 className="mt-7 text-xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-gray-600">{text}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className="bg-[#f7f4ed] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-6xl font-serif text-[#d49a2c]">“</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-black leading-tight">
            The first step towards
            <br />
            transformation is{" "}
            <span className="text-[#c88d22]">understanding.</span>
          </h2>
          <p className="mt-6 text-gray-500">
            FREEWILL — Human Empowerment
          </p>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section id="process" className="bg-[#0d4743] py-20 md:py-24 text-white">
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
            {[
              ["01", "Take Assessment", "Complete our simple wellbeing questionnaire and reflect on your current state."],
              ["02", "Understand Your Result", "Receive an easy-to-understand overview that helps you recognise areas that may need attention."],
              ["03", "Get Support", "Book an appointment and connect with professional counselling support."],
            ].map(([num, title, text]) => (
              <div
                key={num}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
              >
                <span className="text-5xl font-black text-[#eab34a]">{num}</span>
                <h3 className="mt-7 text-2xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-white/65">{text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= EXPERTS ================= */}
      <section id="experts" className="bg-[#f7f4ed] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              Meet Our Experts
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black">
              Guidance From Experienced Professionals
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              Connect with experienced professionals who bring expertise,
              compassion and practical guidance to your personal growth journey.
            </p>
          </div>

          <div className="mt-14 grid lg:grid-cols-3 gap-8">

            {/* SIMON */}
            <ExpertCard
              image={bossImage}
              experience="26 YEARS EXPERIENCE"
              role="Founder / CEO"
              name="Simon Anand Raj"
              title="Emotional Intelligence Coach"
              description="Simon Anand Raj is the Founder & CEO and an experienced Emotional Intelligence Coach with 26 years of professional experience in training, coaching, mentoring and human development. His work focuses on helping individuals and organisations develop emotional intelligence, improve self-awareness, strengthen relationships and unlock their potential."
              services={[
                ["One Hour", "₹1,500"],
                ["Psychometric Analysis", "₹2,500"],
                ["One-to-One Session", "₹3,000"],
                ["Training Sessions", "₹12,000"],
                ["Mentoring", "₹25,000"],
              ]}
              note="Extended sessions and specialised programs may range from ₹5,000 to ₹50,000."
              button="Book a Session →"
            />

            {/* JEEVITHA */}
            <ExpertCard
              image={jeevithaImage}
              experience="5 YEARS EXPERIENCE"
              role="Clinical Psychologist / Project Head"
              name="Jeevitha S"
              title="Clinical Psychologist & Project Head"
              description="Jeevitha S is a Clinical Psychologist and Project Head with 5 years of experience in counselling, coaching and professional training. She focuses on creating a supportive and structured environment where individuals can gain clarity, develop emotional awareness and work towards meaningful personal growth."
              services={[
                ["One Hour", "₹1,500"],
                ["Psychometric Analysis", "₹2,500"],
                ["One-to-One Session", "₹3,000"],
                ["Training Sessions", "₹12,000"],
                ["Mentoring", "₹25,000"],
              ]}
              note="Session pricing may range from ₹1,000 to ₹10,000 depending on the service."
              button="Book a Session →"
              light
            />

            {/* RAHUL */}
            <div className="group overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-[360px] overflow-hidden bg-[#0d4743]">
                <img
                  src={rahulImage}
                  alt="Rahul K.P"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-[#e8a83b] px-4 py-2 text-xs font-bold">
                  7 YEARS EXPERIENCE
                </div>
              </div>

              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                  Life Coach / Content Head
                </p>

                <h3 className="mt-2 text-2xl font-black">Rahul K.P</h3>

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
                    {["Life Coaching", "Training", "Content Management"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full bg-[#edf4f2] px-3 py-2 text-xs font-semibold"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>

                  <p className="mt-5 text-xs text-gray-400">
                    Service pricing will be available based on the selected program.
                  </p>
                </div>

                <Link
                  to="/booking"
                  className="mt-7 block rounded-full bg-[#0d4743] px-6 py-4 text-center font-bold text-white hover:bg-[#12554f] transition"
                >
                  Explore & Book →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              What We Do
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black">
              Our Services
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-7">

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
              <h3 className="text-2xl font-black">FREEWILL</h3>
              <p className="mt-2 font-semibold text-[#eab34a]">
                Human Empowerment
              </p>
              <p className="mt-4 max-w-sm leading-7 text-white/55">
                World's First Psycho-Spiritual and Quantum Philosophical
                Training Firm.
              </p>
            </div>

            <div>
              <h4 className="font-bold">Quick Links</h4>

              <div className="mt-4 flex flex-col gap-3 text-sm text-white/55">
                <Link to="/home">Home</Link>
                <a href="#about">About</a>
                <a href="#experts">Experts</a>
                <a href="#services">Services</a>
                <Link to="/assessment">Assessment</Link>
                <Link to="/booking">Appointment</Link>
                <Link to="/login">Login / Sign Up</Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold">Start Your Journey</h4>

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
            <p>© 2026 FREEWILL. All rights reserved.</p>

            <a
              href="https://www.instagram.com/ragul_arunan/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[11px] font-serif tracking-wide text-white/30"
            >
              𝓡𝓪𝓰𝓾𝓵 𝓐𝓻𝓾𝓷𝓪𝓷
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}

/* ================= EXPERT CARD ================= */

function ExpertCard({
  image,
  experience,
  role,
  name,
  title,
  description,
  services,
  note,
  button,
  light = false,
}: {
  image: string;
  experience: string;
  role: string;
  name: string;
  title: string;
  description: string;
  services: string[][];
  note: string;
  button: string;
  light?: boolean;
}) {
  return (
    <div className="group overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className={`relative h-[360px] overflow-hidden ${light ? "bg-[#f0e7d4]" : "bg-[#0d4743]"}`}>
        <img
          src={image}
          alt={name}
          className={`h-full w-full ${light ? "object-cover" : "object-contain"} transition duration-500 group-hover:scale-105`}
        />

        <div className="absolute bottom-4 left-4 rounded-full bg-[#e8a83b] px-4 py-2 text-xs font-bold text-[#173d3a]">
          {experience}
        </div>
      </div>

      <div className="p-7">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
          {role}
        </p>

        <h3 className="mt-2 text-2xl font-black text-[#173d3a]">
          {name}
        </h3>

        <p className="mt-2 font-semibold text-gray-700">{title}</p>

        <p className="mt-4 text-sm leading-6 text-gray-600">
          Training, Counselling & Coaching
        </p>

        <p className="mt-5 text-sm leading-7 text-gray-600">
          {description}
        </p>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Services
          </p>

          <div className="mt-3 space-y-2 text-sm text-gray-600">
            {services.map(([service, price]) => (
              <div key={service} className="flex justify-between gap-4">
                <span>{service}</span>
                <span className="font-bold text-[#173d3a]">
                  {price}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-400">{note}</p>
        </div>

        <Link
          to="/booking"
          className="mt-7 block rounded-full bg-[#0d4743] px-6 py-4 text-center font-bold text-white hover:bg-[#12554f] transition"
        >
          {button}
        </Link>
      </div>
    </div>
  );
}

/* ================= SERVICE CARD ================= */

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
      <div className="text-4xl">{icon}</div>

      <h3 className="mt-6 text-xl font-bold">{title}</h3>

      <p className="mt-4 leading-7 text-gray-600">{text}</p>

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
