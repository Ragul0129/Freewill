import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-200 mb-4">
                FREEWILL – Human Empowerment
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Understand Your Mind.
                <br />
                Improve Your Life.
              </h1>

              <p className="mt-6 text-lg md:text-xl text-purple-100 max-w-xl">
                Take a simple self-assessment, understand your mental
                wellbeing and connect with professional counselling support.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/assessment"
                  className="px-7 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-gray-100 transition"
                >
                  Take Assessment
                </Link>

                <Link
                  to="/booking"
                  className="px-7 py-3 rounded-xl border border-white/50 text-white font-semibold hover:bg-white/10 transition"
                >
                  Book Counselling
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src={heroImage}
                alt="FREEWILL Mental Wellness"
                className="w-full max-w-lg rounded-3xl shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <p className="text-indigo-600 font-semibold">
              OUR SERVICES
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Support for Your Wellbeing
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Explore your wellbeing, understand yourself better and get
              professional support when you need it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-5">🧠</div>

              <h3 className="text-xl font-bold mb-3">
                Mental Wellness Assessment
              </h3>

              <p className="text-gray-600 mb-6">
                Answer simple questions and receive an instant wellbeing
                assessment report.
              </p>

              <Link
                to="/assessment"
                className="text-indigo-600 font-semibold"
              >
                Start Assessment →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-5">💬</div>

              <h3 className="text-xl font-bold mb-3">
                Professional Counselling
              </h3>

              <p className="text-gray-600 mb-6">
                Connect with trained professionals and get personalised
                guidance and support.
              </p>

              <Link
                to="/booking"
                className="text-indigo-600 font-semibold"
              >
                Book Appointment →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-5">📅</div>

              <h3 className="text-xl font-bold mb-3">
                Manage Appointments
              </h3>

              <p className="text-gray-600 mb-6">
                Easily view and manage your counselling appointments from
                your account.
              </p>

              <Link
                to="/my-appointment"
                className="text-indigo-600 font-semibold"
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
            <h2 className="text-3xl md:text-4xl font-bold">
              How FREEWILL Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold">
                1
              </div>

              <h3 className="font-bold text-xl mt-5">
                Take Assessment
              </h3>

              <p className="text-gray-600 mt-2">
                Complete our simple wellbeing questionnaire.
              </p>
            </div>

            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold">
                2
              </div>

              <h3 className="font-bold text-xl mt-5">
                Understand Your Result
              </h3>

              <p className="text-gray-600 mt-2">
                Get an easy-to-understand assessment result.
              </p>
            </div>

            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold">
                3
              </div>

              <h3 className="font-bold text-xl mt-5">
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
      <section className="py-20 bg-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold">
            Your wellbeing matters.
          </h2>

          <p className="mt-4 text-indigo-100 text-lg">
            Take the first step towards understanding yourself better.
          </p>

          <Link
            to="/assessment"
            className="inline-block mt-8 px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            Start Your Assessment
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <p className="text-white font-semibold text-lg">
            FREEWILL
          </p>

          <p className="mt-2 text-sm">
            Human Empowerment
          </p>

          <p className="mt-4 text-xs">
            © 2026 FREEWILL. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  );
}

export default Home;
