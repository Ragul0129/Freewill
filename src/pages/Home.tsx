import { Link } from "react-router-dom";
import bossImage from "../assets/boss.png";

function Home() {
  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#173d3a]">

      {/* ================= NAVBAR ================= */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">

            <Link
              to="/"
              className="text-2xl md:text-3xl font-black tracking-wide text-white"
            >
              FREEWILL
            </Link>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
              <Link to="/" className="hover:text-[#e9ad3d] transition">
                Home
              </Link>

              <a href="#about" className="hover:text-[#e9ad3d] transition">
                About
              </a>

              <a href="#services" className="hover:text-[#e9ad3d] transition">
                Services
              </a>

              <a href="#process" className="hover:text-[#e9ad3d] transition">
                How It Works
              </a>

              <Link
                to="/booking"
                className="hover:text-[#e9ad3d] transition"
              >
                Appointment
              </Link>
            </nav>

            <Link
              to="/assessment"
              className="rounded-full bg-[#e8a83b] px-6 py-3 text-sm font-bold text-[#173d3a] shadow-lg hover:bg-[#f2bd58] transition"
            >
              Get Started
            </Link>

          </div>
        </div>
      </header>


      {/* ================= HERO ================= */}
      <section className="relative min-h-[720px] overflow-hidden bg-[#0d4743] text-white">

        {/* Decorative circles */}
        <div className="absolute -right-32 top-20 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="absolute -right-20 top-32 h-[400px] w-[400px] rounded-full bg-[#185c56]/60 blur-2xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#083b38]/70 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 md:pt-40">

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10">

            {/* HERO CONTENT */}
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

              {/* Floating quote */}
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


        {/* Curved bottom */}
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


            {/* Founder card */}
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
            <span className="text-[#c88d22]"> understanding.</span>
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


      {/* ================= SERVICES ================= */}
      <section id="services" className="bg-white py-20 md:py-24">

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

              <Link
                to="/my-appointment"
                className="mt-7 inline-block font-bold text-[#c88d22]"
              >
                My Appointments →
              </Link>

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

                <Link to="/" className="hover:text-[#eab34a]">
                  Home
                </Link>

                <a href="#about" className="hover:text-[#eab34a]">
                  About
                </a>

                <a href="#services" className="hover:text-[#eab34a]">
                  Services
                </a>

                <Link to="/assessment" className="hover:text-[#eab34a]">
                  Assessment
                </Link>

                <Link to="/booking" className="hover:text-[#eab34a]">
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
