import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import AssessmentResult from "./pages/AssessmentResult";
import Booking from "./pages/Booking";
import UserDashboard from "./pages/UserDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* ================= AUTH ================= */}

      {/* Website opening page */}
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* ================= MAIN WEBSITE ================= */}

      <Route path="/home" element={<Home />} />

      <Route path="/assessment" element={<Assessment />} />

      <Route path="/result" element={<AssessmentResult />} />

      <Route path="/booking" element={<Booking />} />


      {/* ================= DASHBOARDS ================= */}

      <Route path="/dashboard" element={<UserDashboard />} />

      <Route
        path="/expert-dashboard"
        element={<ExpertDashboard />}
      />

      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />


      {/* ================= FALLBACK ================= */}

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
