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
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />

      <Route
        path="/assessment"
        element={
          <ProtectedRoute allowedRoles={["user", "expert", "admin"]}>
            <Assessment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result"
        element={
          <ProtectedRoute allowedRoles={["user", "expert", "admin"]}>
            <AssessmentResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/experts"
        element={
          <ProtectedRoute allowedRoles={["user", "expert", "admin"]}>
            <Experts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Booking />
          </ProtectedRoute>
        }
      />

      {/* User */}
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

      {/* Expert */}
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

      {/* Admin */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown route */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
