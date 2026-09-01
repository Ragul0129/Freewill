import { Link, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-[#f7f4ed] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
          FREEWILL • Human Empowerment
        </p>

        <h1 className="mt-4 text-4xl md:text-5xl font-black text-[#173d3a]">
          {title}
        </h1>

        <p className="mt-5 text-gray-600">
          This section of the FREEWILL platform is being prepared.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 rounded-full bg-[#0d4743] px-7 py-3 font-bold text-white"
        >
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}

function Result() {
  return (
    <ComingSoon title="Your Assessment Result" />
  );
}

function Booking() {
  return (
    <ComingSoon title="Book Counselling" />
  );
}

function Login() {
  return (
    <ComingSoon title="Welcome Back" />
  );
}

function Register() {
  return (
    <ComingSoon title="Create Your Account" />
  );
}

function Dashboard() {
  return (
    <ComingSoon title="My Dashboard" />
  );
}

function MyAppointment() {
  return (
    <ComingSoon title="My Appointments" />
  );
}

function AdminLogin() {
  return (
    <ComingSoon title="Admin Login" />
  );
}

function AdminDashboard() {
  return (
    <ComingSoon title="Admin Dashboard" />
  );
}

function About() {
  return (
    <ComingSoon title="About FREEWILL" />
  );
}

function Contact() {
  return (
    <ComingSoon title="Contact FREEWILL" />
  );
}

function App() {
  return (
    <Routes>

      {/* Main Pages */}
      <Route path="/" element={<Home />} />

      <Route
        path="/assessment"
        element={<Assessment />}
      />

      <Route
        path="/result"
        element={<Result />}
      />

      <Route
        path="/booking"
        element={<Booking />}
      />

      {/* User Authentication */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* User Area */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/my-appointment"
        element={<MyAppointment />}
      />

      {/* Admin */}
      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />

      {/* Information */}
      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <ComingSoon title="Page Not Found" />
        }
      />

    </Routes>
  );
}

export default App;
