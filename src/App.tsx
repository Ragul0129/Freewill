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

function App() {
  return (
    <Routes>
      {/* User */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />

      {/* Assessment */}
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/result" element={<AssessmentResult />} />

      {/* Booking */}
      <Route path="/booking" element={<Booking />} />

      {/* Experts Marketplace */}
      <Route path="/experts" element={<Experts />} />

      {/* User Dashboard */}
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route
        path="/my-appointments"
        element={<MyAppointments />}
      />

      {/* Expert */}
      <Route
        path="/expert-dashboard"
        element={<ExpertDashboard />}
      />
      <Route
        path="/expert-profile"
        element={<ExpertProfile />}
      />
      <Route
        path="/expert-services"
        element={<ExpertServices />}
      />

      {/* Admin */}
      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />

      {/* Fallback */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
