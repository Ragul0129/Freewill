import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          FREEWILL
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/assessment">Assessment</Link>
          <Link to="/booking">Counselling</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="navbar-button">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
