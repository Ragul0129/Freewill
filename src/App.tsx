import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import AssessmentResult from "./pages/AssessmentResult";
import Booking from "./pages/Booking";
import MyAppointments from "./pages/MyAppointments";
import UserDashboard from "./pages/UserDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= MAIN WEBSITE ================= */}
      <Route path="/home" element={<Home />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/result" element={<AssessmentResult />} />
      <Route path="/booking" element={<Booking />} />

      {/* ================= USER ================= */}
      <Route path="/my-appointments" element={<MyAppointments />} />
      <Route path="/dashboard" element={<UserDashboard />} />

      {/* ================= EXPERT ================= */}
      <Route path="/expert-dashboard" element={<ExpertDashboard />} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
