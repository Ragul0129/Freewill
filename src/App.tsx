import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import AssessmentResult from "./pages/AssessmentResult";
import Booking from "./pages/Booking";
import UserDashboard from "./pages/UserDashboard";
import MyAppointments from "./pages/MyAppointments";

import Experts from "./pages/Experts";

import ExpertDashboard from "./pages/ExpertDashboard";
import ExpertProfile from "./pages/ExpertProfile";
import ExpertServices from "./pages/ExpertServices";

import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* =========================
          PUBLIC PAGES
         ========================= */}

      <Route path="/" element={<Home />} />

      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Assessment is now PUBLIC */}
      <Route path="/assessment" element={<Assessment />} />

      {/* Assessment result is now PUBLIC */}
      <Route path="/result" element={<AssessmentResult />} />

      {/* Experts page is PUBLIC */}
      <Route path="/experts" element={<Experts />} />

      {/* Booking page is PUBLIC */}
      <Route path="/booking" element={<Booking />} />

      {/* =========================
          USER LOGIN REQUIRED
         ========================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-appointments"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <MyAppointments />
          </ProtectedRoute>
        }
      />

      {/* =========================
          EXPERT LOGIN REQUIRED
         ========================= */}

      <Route
        path="/expert-dashboard"
        element={
          <ProtectedRoute allowedRoles={["expert"]}>
            <ExpertDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/expert-profile"
        element={
          <ProtectedRoute allowedRoles={["expert"]}>
            <ExpertProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/expert-services"
        element={
          <ProtectedRoute allowedRoles={["expert"]}>
            <ExpertServices />
          </ProtectedRoute>
        }
      />

      {/* =========================
          ADMIN LOGIN REQUIRED
         ========================= */}

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* =========================
          FALLBACK
         ========================= */}

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
