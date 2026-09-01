import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold text-emerald-800"
          >
            FREEWILL
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-100">

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}
            <div>

              <p className="text-sm md:text-base font-semibold uppercase tracking-widest text-emerald-700 mb-5">
                FREEWILL – HUMAN EMPOWERMENT
              </p>

              <div className="w-16 h-1 bg-yellow-500 mb-6 rounded-full" />

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-emerald-950">
                World's First
                <br />
                Psycho-Spiritual and
                <br />
                Quantum Philosophical
                <br />
                Training Firm
              </h1>

              <p className="mt-7 text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed">
                Explore your wellbeing, understand yourself better and connect
                with professional counselling support whenever you need it.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">

                <Link
                  to="/assessment"
                  className="px-7 py-3.5 rounded-xl bg-emerald-700 text-white font-semibold shadow-lg hover:bg-emerald-800 hover:shadow-xl transition"
                >
                  Take Assessment
                </Link>

                <Link
                  to="/booking"
                  className="px-7 py-3.5 rounded-xl border-2 border-emerald-700 text-emerald-800 font-semibold hover:bg-emerald-50 transition"
                >
                  Book Counselling
                </Link>

              </div>

            </div>

            {/* Hero Image */}
            <div className="flex justify-center">

              <div className="relative">

                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-300/30 via-emerald-300/30 to-sky-300/30 rounded-[2rem] blur-xl" />

                <img
                  src={heroImage}
                  alt="FREEWILL Human Empowerment"
                  className="relative w-full max-w-lg rounded-3xl shadow-2xl"
                />

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Gold Accent */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-700 via-yellow-500 to-sky-500" />

      {/* Services */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-emerald-700 font-semibold tracking-widest">
              OUR SERVICES
            </p>

            <div className="w-12 h-1 bg-yellow-500 mx-auto mt-3 rounded-full" />

            <h2 className="text-3xl md:text-4xl font-bold mt-5 text-emerald-950">
              Support for Your Wellbeing
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Explore your wellbeing, understand yourself better and get
              professional support when you need it.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Assessment */}
            <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-emerald-100 text-3xl mb-5">
                🧠
              </div>

              <h3 className="text-xl font-bold mb-3 text-emerald-950">
                Mental Wellness Assessment
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Answer simple questions and receive an instant wellbeing
                assessment report.
              </p>

              <Link
                to="/assessment"
                className="text-emerald-700 font-semibold hover:text-emerald-900"
              >
                Start Assessment →
              </Link>

            </div>

            {/* Counselling */}
            <div className="bg-white p-8 rounded-2xl border border-sky-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-sky-100 text-3xl mb-5">
                💬
              </div>

              <h3 className="text-xl font-bold mb-3 text-emerald-950">
                Professional Counselling
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Connect with trained professionals and get personalised
                guidance and support.
              </p>

              <Link
                to="/booking"
                className="text-emerald-700 font-semibold hover:text-emerald-900"
              >
                Book Appointment →
              </Link>

            </div>

            {/* Appointments */}
            <div className="bg-white p-8 rounded-2xl border border-yellow-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-yellow-100 text-3xl mb-5">
                📅
              </div>

              <h3 className="text-xl font-bold mb-3 text-emerald-950">
                Manage Appointments
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Easily view and manage your counselling appointments from
                your account.
              </p>

              <Link
                to="/my-appointment"
                className="text-emerald-700 font-semibold hover:text-emerald-900"
              >
                My Appointments →
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-emerald-700 font-semibold tracking-widest">
              SIMPLE PROCESS
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-emerald-950">
              How FREEWILL Works
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            {/* Step 1 */}
            <div>

              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-700 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                1
              </div>

              <h3 className="font-bold text-xl mt-5 text-emerald-950">
                Take Assessment
              </h3>

              <p className="text-gray-600 mt-2">
                Complete our simple wellbeing questionnaire.
              </p>

            </div>

            {/* Step 2 */}
            <div>

              <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                2
              </div>

              <h3 className="font-bold text-xl mt-5 text-emerald-950">
                Understand Your Result
              </h3>

              <p className="text-gray-600 mt-2">
                Get an easy-to-understand assessment result.
              </p>

            </div>

            {/* Step 3 */}
            <div>

              <div className="w-16 h-16 mx-auto rounded-full bg-sky-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                3
              </div>

              <h3 className="font-bold text-xl mt-5 text-emerald-950">
                Get Support
              </h3>

              <p className="text-gray-600 mt-2">
                Book a counselling appointment if you need further support.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-r from-emerald-800 via-emerald-700 to-sky-700 text-white text-center">

        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6">

          <p className="text-yellow-300 font-semibold tracking-widest uppercase">
            Your Journey Starts Here
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Your wellbeing matters.
          </h2>

          <p className="mt-4 text-emerald-50 text-lg">
            Take the first step towards understanding yourself better.
          </p>

          <Link
            to="/assessment"
            className="inline-block mt-8 px-8 py-4 bg-white text-emerald-800 rounded-xl font-bold shadow-lg hover:bg-yellow-50 transition"
          >
            Start Your Assessment
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-100 py-10">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <p className="text-white font-bold text-2xl">
            FREEWILL
          </p>

          <p className="mt-2 text-yellow-400 font-medium">
            Human Empowerment
          </p>

          <div className="w-12 h-0.5 bg-yellow-500 mx-auto mt-4" />

          <p className="mt-5 text-sm text-emerald-200">
            © 2026 FREEWILL. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;
