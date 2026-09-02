import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import AssessmentResult from "./pages/AssessmentResult";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/assessment" element={<Assessment />} />

      <Route path="/result" element={<AssessmentResult />} />

      <Route path="/booking" element={<Booking />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<UserDashboard />} />

      <Route
        path="/expert-dashboard"
        element={<ExpertDashboard />}
      />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
