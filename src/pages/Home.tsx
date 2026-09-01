import { Link } from "react-router-dom";
import bossImage from "../assets/boss.png";

function Home() {
  return (
    <div className="min-h-screen bg-[#f8f7ef] text-[#123d35]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#063f35] text-white">

        {/* Background glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#d8ad38]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#78b9c8]/10 blur-3xl" />

        {/* Navbar */}
        <nav className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold tracking-wide"
            >
              FREEWILL
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link to="/" className="hover:text-[#e5bd4d] transition">
                Home
              </Link>

              <Link to="/assessment" className="hover:text-[#e5bd4d] transition">
                Assessment
              </Link>

              <Link to="/booking" className="hover:text-[#e5bd4d] transition">
                Counselling
              </Link>

              <Link to="/login" className="hover:text-[#e5bd4d] transition">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-[#e5bd4d] text-[#123d35] px-6 py-3 rounded-full font-bold hover:bg-[#f0ce6c] transition"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile button */}
            <Link
              to="/register"
              className="md:hidden bg-[#e5bd4d] text-[#123d35] px-5 py-3 rounded-full font-bold"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20 lg:pt-16 lg:pb-28">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT */}
            <div>

              <p className="text-[#e5bd4d] font-semibold tracking-[0.2em] uppercase text-sm md:text-base mb-5">
                FREEWILL – Human Empowerment
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                World's First
                <br />
                <span className="text-[#e5bd4d]">
                  Psycho-Spiritual
                </span>
                <br />
                and Quantum
                <br />
                Philosophical
                <br />
                Training Firm
              </h1>

              <p className="mt-7 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                Discover yourself, understand your mind and take meaningful
                steps towards a healthier and more empowered life.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  to="/assessment"
                  className="px-7 py-4 rounded-full bg-[#e5bd4d] text-[#123d35] font-bold hover:bg-[#f0ce6c] transition shadow-lg"
                >
                  Take Assessment →
                </Link>

                <Link
                  to="/booking"
                  className="px-7 py-4 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition"
                >
                  Book Counselling
                </Link>

              </div>

              {/* Small highlights */}
              <div className="mt-10 grid grid-cols-3 gap-5 max-w-xl">

                <div className="border-l border-[#e5bd4d]/60 pl-4">
                  <p className="text-[#e5bd4d] text-xl font-bold">
                    100%
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Confidential
                  </p>
                </div>

                <div className="border-l border-[#e5bd4d]/60 pl-4">
                  <p className="text-[#e5bd4d] text-xl font-bold">
                    Expert
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Guidance
                  </p>
                </div>

                <div className="border-l border-[#e5bd4d]/60 pl-4">
                  <p className="text-[#e5bd4d] text-xl font-bold">
                    Safe
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Support
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT - BOSS IMAGE */}
            <div className="relative flex justify-center lg:justify-end">

              <div className="absolute inset-0 bg-[#e5bd4d]/20 blur-3xl rounded-full scale-75" />

              <div className="relative w-full max-w-xl">

                {/* Decorative circle */}
                <div className="absolute -top-5 -right-5 w-24 h-24 border-2 border-[#e5bd4d]/60 rounded-full" />

                <div className="absolute bottom-10 -left-5 w-16 h-16 border border-[#78b9c8]/50 rounded-full" />

                <img
                  src={bossImage}
                  alt="FREEWILL Founder"
                  className="relative z-10 w-full object-contain drop-shadow-2xl"
                />

                {/* Quote card */}
                <div className="absolute z-20 bottom-5 left-2 md:left-[-30px] bg-[#073d34]/95 backdrop-blur-md border border-[#e5bd4d]/70 rounded-2xl px-5 py-4 shadow-xl max-w-xs">

                  <p className="text-[#e5bd4d] text-2xl font-serif">
                    “
                  </p>

                  <p className="font-semibold text-white text-sm md:text-base">
                    Your Mental Health
                    <span className="text-[#e5bd4d]">
                      {" "}is Our Priority
                    </span>
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-[-1px] left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C180,120 300,120 450,80 C600,40 700,40 820,80 C980,130 1110,120 1260,80 C1340,60 1390,65 1440,80 L1440,120 L0,120 Z"
              fill="#f8f7ef"
            />
          </svg>
        </div>

      </section>


      {/* WHY FREEWILL */}
      <section className="py-20 bg-[#f8f7ef]">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">

            <p className="text-[#9b7a20] font-bold tracking-widest uppercase text-sm">
              Why Choose FREEWILL
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-[#123d35] mt-3">
              Understand Yourself.
              <br />
              Take Control. Live Better.
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto mt-5">
              A supportive approach designed to help you understand your
              wellbeing and move towards meaningful personal growth.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-7">

            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-[#d8c98b]/40 shadow-sm hover:shadow-xl transition">

              <div className="w-14 h-14 rounded-2xl bg-[#063f35] text-[#e5bd4d] flex items-center justify-center text-2xl mb-6">
                🧠
              </div>

              <h3 className="text-xl font-bold mb-3">
                Self-Assessment
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                Confidential questionnaires to help you understand your
                mental wellbeing.
              </p>

              <Link
                to="/assessment"
                className="text-[#126052] font-bold"
              >
                Start Assessment →
              </Link>

            </div>


            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 border border-[#d8c98b]/40 shadow-sm hover:shadow-xl transition">

              <div className="w-14 h-14 rounded-2xl bg-[#063f35] text-[#e5bd4d] flex items-center justify-center text-2xl mb-6">
                💬
              </div>

              <h3 className="text-xl font-bold mb-3">
                Professional Counselling
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                Connect with experienced professionals for personalised
                guidance and support.
              </p>

              <Link
                to="/booking"
                className="text-[#126052] font-bold"
              >
                Book Appointment →
              </Link>

            </div>


            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 border border-[#d8c98b]/40 shadow-sm hover:shadow-xl transition">

              <div className="w-14 h-14 rounded-2xl bg-[#063f35] text-[#e5bd4d] flex items-center justify-center text-2xl mb-6">
                🛡️
              </div>

              <h3 className="text-xl font-bold mb-3">
                Privacy & Care
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                Your privacy matters. We aim to provide a safe and
                confidential experience.
              </p>

              <Link
                to="/register"
                className="text-[#126052] font-bold"
              >
                Get Started →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">

            <p className="text-[#9b7a20] font-bold uppercase tracking-widest text-sm">
              Simple Process
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-[#123d35] mt-3">
              Your Journey Starts Here
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div>

              <div className="w-16 h-16 mx-auto rounded-full bg-[#063f35] text-[#e5bd4d] flex items-center justify-center text-xl font-bold">
                01
              </div>

              <h3 className="text-xl font-bold mt-6">
                Understand
              </h3>

              <p className="text-gray-600 mt-3">
                Complete a simple self-assessment and explore your wellbeing.
              </p>

            </div>


            <div>

              <div className="w-16 h-16 mx-auto rounded-full bg-[#063f35] text-[#e5bd4d] flex items-center justify-center text-xl font-bold">
                02
              </div>

              <h3 className="text-xl font-bold mt-6">
                Discover
              </h3>

              <p className="text-gray-600 mt-3">
                Understand your results and gain useful insights about yourself.
              </p>

            </div>


            <div>

              <div className="w-16 h-16 mx-auto rounded-full bg-[#063f35] text-[#e5bd4d] flex items-center justify-center text-xl font-bold">
                03
              </div>

              <h3 className="text-xl font-bold mt-6">
                Grow
              </h3>

              <p className="text-gray-600 mt-3">
                Connect with professional support and take your next step.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="py-20 bg-[#063f35] text-white">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <p className="text-[#e5bd4d] font-semibold tracking-widest uppercase">
            Begin Your Journey
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            Your Wellbeing Matters.
          </h2>

          <p className="mt-5 text-white/75 text-lg">
            Take the first step towards understanding yourself better.
          </p>

          <Link
            to="/assessment"
            className="inline-block mt-8 px-8 py-4 bg-[#e5bd4d] text-[#123d35] rounded-full font-bold hover:bg-[#f0ce6c] transition"
          >
            Start Your Assessment →
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="bg-[#022b25] text-white py-10">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h3 className="text-2xl font-bold">
            FREEWILL
          </h3>

          <p className="text-[#e5bd4d] mt-2 font-medium">
            Human Empowerment
          </p>

          <p className="text-white/50 text-sm mt-6">
            © 2026 FREEWILL. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;
