import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="brand mini"><span className="brand-dot" /> MindMapify</div>
          <div className="copy">© 2023 MindMapify, All Rights Reserved</div>
        </div>
        <nav className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}