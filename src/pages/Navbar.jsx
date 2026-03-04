import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">⚡ <span>Energy</span>Bill</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload Bill</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;