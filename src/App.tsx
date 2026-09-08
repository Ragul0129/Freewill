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
      {/* Public Pages */}

      {/* Website opening page → Home */}
      <Route path="/" element={<Home />} />

      {/* Login / Register */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Home */}
      <Route path="/home" element={<Home />} />

      {/* Assessment */}
      <Route
        path="/assessment"
        element={
          <ProtectedRoute allowedRoles={["user", "expert", "admin"]}>
            <Assessment />
          </ProtectedRoute>
        }
      />

      {/* Assessment Result */}
      <Route
        path="/result"
        element={
          <ProtectedRoute allowedRoles={["user", "expert", "admin"]}>
            <AssessmentResult />
          </ProtectedRoute>
        }
      />

      {/* Experts → Public */}
      <Route
        path="/experts"
        element={<Experts />}
      />

      {/* Booking → Login required */}
      <Route
        path="/booking"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Booking />
          </ProtectedRoute>
        }
      />

      {/* User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* My Appointments */}
      <Route
        path="/my-appointments"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <MyAppointments />
          </ProtectedRoute>
        }
      />

      {/* Expert Dashboard */}
      <Route
        path="/expert-dashboard"
        element={
          <ProtectedRoute allowedRoles={["expert"]}>
            <ExpertDashboard />
          </ProtectedRoute>
        }
      />

      {/* Expert Profile */}
      <Route
        path="/expert-profile"
        element={
          <ProtectedRoute allowedRoles={["expert"]}>
            <ExpertProfile />
          </ProtectedRoute>
        }
      />

      {/* Expert Services */}
      <Route
        path="/expert-services"
        element={
          <ProtectedRoute allowedRoles={["expert"]}>
            <ExpertServices />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown route → Home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
