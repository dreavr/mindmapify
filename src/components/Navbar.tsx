import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-dot" /> MindMapify
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/editor" className="nav-link">Create Mind Map</NavLink>
          <NavLink to="/about" className="nav-link">About Us</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </nav>
        <div className="nav-cta">
          <button className="btn btn-outline">Login</button>
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </header>
  );
}