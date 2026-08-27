import "./../styles/sidebar.css";
import { Link } from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">

      <Link to="/dashboard">
        <FaHome /> Dashboard
      </Link>

      <Link to="/profile">
        <FaUser /> Profile
      </Link>

      <Link to="/profile">
        <FaHeart /> Saved Careers
      </Link>

      <Link to="/login">
        <FaSignOutAlt /> Logout
      </Link>

    </div>
  );
}

export default Sidebar;