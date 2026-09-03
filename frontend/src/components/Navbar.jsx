import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <header className="cn-navbar">
      
      {/* Logo */}
      <Link to="/" className="cn-logo">
        Career Navigator <span>AI</span>
      </Link>

      {/* Navigation */}
      <nav className="cn-nav">
        <Link
          to="/dashboard"
          className={`cn-nav-link ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          Explore
        </Link>

        <Link
          to="/ai-advisor"
          className={`cn-nav-link ${
            location.pathname === "/ai-advisor" ? "active" : ""
          }`}
        >
          AI Advisor
        </Link>

        <Link
          to="/profile"
          className={`cn-nav-link ${
            location.pathname === "/profile" ? "active" : ""
          }`}
        >
          Profile
        </Link>
      </nav>

      {/* Actions */}
      <div className="cn-nav-actions">

        <Link to="/login">
          <button className="cn-login">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="cn-register">
            Register
          </button>
        </Link>

      </div>
    </header>
  );
}

export default Navbar;