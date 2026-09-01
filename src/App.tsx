import { Link, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";


// ===============================
// RESULT PAGE
// ===============================

function Result() {
  const location = useLocation();

  const score = location.state?.score ?? 0;
  const totalQuestions = location.state?.totalQuestions ?? 10;

  const maxScore = totalQuestions * 4;

  let level = "";
  let message = "";

  if (score <= 13) {
    level = "Low Concern";

    message =
      "Your responses suggest relatively positive wellbeing. Continue maintaining healthy habits, meaningful relationships and activities that support your overall wellbeing.";
  } else if (score <= 26) {
    level = "Moderate Concern";

    message =
      "Your responses suggest that you may be experiencing some areas of emotional difficulty. Taking time for yourself, maintaining healthy routines and speaking with someone you trust may be helpful.";
  } else {
    level = "Higher Concern";

    message =
      "Your responses suggest that you may be experiencing significant emotional difficulties. Consider connecting with a qualified professional for personalised guidance and support.";
  }

  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className="min-h-screen bg-[#f7f4ed] px-5 py-24 text-[#173d3a]">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
            FREEWILL • HUMAN EMPOWERMENT
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-5xl">
            Your Wellbeing Result
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Thank you for completing the FREEWILL self-assessment.
            Your result gives you a general indication based on your
            responses.
          </p>

        </div>


        {/* SCORE CARD */}
        <div className="mt-10 rounded-[2rem] bg-white p-8 text-center shadow-xl md:p-12">

          <p className="text-sm font-bold uppercase tracking-[0.15em] text-gray-500">
            Your Assessment Score
          </p>


          {/* Circle */}
          <div className="mt-7 flex justify-center">

            <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-[12px] border-[#0d4743]">

              <span className="text-5xl font-black text-[#173d3a]">
                {score}
              </span>

              <span className="mt-1 text-sm font-semibold text-gray-500">
                out of {maxScore}
              </span>

            </div>

          </div>


          {/* Level */}
          <div className="mt-8">

            <span className="inline-block rounded-full bg-[#f8f1e1] px-7 py-3 font-bold text-[#b27a18]">
              {level}
            </span>

          </div>


          {/* Progress */}
          <div className="mx-auto mt-8 max-w-xl">

            <div className="mb-3 flex justify-between text-sm font-semibold text-gray-500">

              <span>
                Wellbeing Indicator
              </span>

              <span>
                {percentage}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full bg-[#0d4743] transition-all duration-700"
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* RESULT EXPLANATION */}
        <div className="mt-6 rounded-[2rem] bg-[#0d4743] p-8 text-white shadow-lg md:p-10">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c88d22] text-2xl">
              ✦
            </div>

            <div>

              <h2 className="text-2xl font-black">
                Understanding Your Result
              </h2>

              <p className="mt-4 leading-7 text-white/85">
                {message}
              </p>

            </div>

          </div>

        </div>


        {/* SUPPORT SECTION */}
        <div className="mt-6 rounded-[2rem] bg-white p-8 shadow-lg md:p-10">

          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c88d22]">
            FREEWILL • HUMAN EMPOWERMENT
          </p>

          <h2 className="mt-3 text-3xl font-black text-[#173d3a]">
            You don't have to figure everything out alone.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            If you feel you would benefit from additional guidance,
            FREEWILL can help you connect with professional counselling
            support.
          </p>


          <div className="mt-7 flex flex-wrap gap-4">

            <Link
              to="/booking"
              className="rounded-full bg-[#0d4743] px-7 py-3 font-bold text-white shadow-md transition hover:bg-[#12554f]"
            >
              Book Counselling →
            </Link>

            <Link
              to="/assessment"
              className="rounded-full border-2 border-[#0d4743] px-7 py-3 font-bold text-[#0d4743] transition hover:bg-[#f7f4ed]"
            >
              Retake Assessment
            </Link>

          </div>

        </div>


        {/* DISCLAIMER */}
        <div className="mt-8 rounded-2xl border border-[#dedbd2] bg-white/60 p-5 text-center">

          <p className="text-xs leading-5 text-gray-500">
            This self-assessment is intended for general wellbeing
            awareness only. It is not a medical diagnosis, treatment,
            or emergency service.
          </p>

        </div>


        {/* HOME */}
        <div className="mt-8 text-center">

          <Link
            to="/"
            className="font-semibold text-[#0d4743] hover:text-[#c88d22]"
          >
            ← Return to FREEWILL Home
          </Link>

        </div>

      </div>

    </div>
  );
}


// ===============================
// COMING SOON PAGE
// ===============================

function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen bg-[#f7f4ed] flex items-center justify-center px-6">

      <div className="max-w-xl text-center">

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
          FREEWILL • HUMAN EMPOWERMENT
        </p>

        <h1 className="mt-4 text-4xl font-black text-[#173d3a] md:text-5xl">
          {title}
        </h1>

        <p className="mt-5 text-gray-600">
          {description ||
            "This section of the FREEWILL platform is currently being prepared."}
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-[#0d4743] px-7 py-3 font-bold text-white"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}


// ===============================
// APP ROUTES
// ===============================

function App() {
  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />


      {/* ASSESSMENT */}
      <Route
        path="/assessment"
        element={<Assessment />}
      />


      {/* RESULT */}
      <Route
        path="/result"
        element={<Result />}
      />


      {/* BOOKING */}
      <Route
        path="/booking"
        element={
          <ComingSoon
            title="Book Counselling"
            description="Connect with professional counselling support and choose an appointment that works for you."
          />
        }
      />


      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <ComingSoon
            title="Welcome Back"
            description="Login to access your FREEWILL account."
          />
        }
      />


      {/* REGISTER */}
      <Route
        path="/register"
        element={
          <ComingSoon
            title="Create Your Account"
            description="Create your FREEWILL account to manage your assessments and appointments."
          />
        }
      />


      {/* USER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ComingSoon
            title="My Dashboard"
            description="Manage your FREEWILL profile, assessments and counselling services."
          />
        }
      />


      {/* MY APPOINTMENTS */}
      <Route
        path="/my-appointment"
        element={
          <ComingSoon
            title="My Appointments"
            description="View and manage your counselling appointments."
          />
        }
      />


      {/* ADMIN LOGIN */}
      <Route
        path="/admin-login"
        element={
          <ComingSoon
            title="Admin Login"
            description="Secure administrator access for the FREEWILL platform."
          />
        }
      />


      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin-dashboard"
        element={
          <ComingSoon
            title="Admin Dashboard"
            description="Manage counsellors, appointments and platform activities."
          />
        }
      />


      {/* ABOUT */}
      <Route
        path="/about"
        element={
          <ComingSoon
            title="About FREEWILL"
            description="Learn more about FREEWILL Human Empowerment."
          />
        }
      />


      {/* CONTACT */}
      <Route
        path="/contact"
        element={
          <ComingSoon
            title="Contact FREEWILL"
            description="Get in touch with the FREEWILL team."
          />
        }
      />


      {/* 404 */}
      <Route
        path="*"
        element={
          <ComingSoon
            title="Page Not Found"
            description="The page you are looking for does not exist."
          />
        }
      />

    </Routes>
  );
}

export default App;
