import { NavLink, Outlet } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import { CATEGORIES } from "../utils";

// Parent route for nested routing: renders the tabs + <Outlet />
export default function Menu() {
  usePageTitle("Menu");
  return (
    <>
      <h1>Our Menu</h1>
      <div className="tabs">
        {CATEGORIES.map((c) => (
          <NavLink key={c} to={`/menu/${c}`} className={({ isActive }) => (isActive ? "tab active" : "tab")}>
            {c}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </>
  );
}
