import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import AssessmentResult from "./pages/AssessmentResult";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Assessment */}
      <Route path="/assessment" element={<Assessment />} />

      {/* Assessment Result */}
      <Route path="/result" element={<AssessmentResult />} />

      {/* Counselling Booking */}
      <Route path="/booking" element={<Booking />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
