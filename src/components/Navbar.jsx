import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reservations", label: "Reservations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const count = useSelector((s) => s.cart.items.reduce((n, i) => n + i.qty, 0));

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>🌶️ Spice Route</Link>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/cart" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
            Cart {count > 0 && <span className="badge">{count}</span>}
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
