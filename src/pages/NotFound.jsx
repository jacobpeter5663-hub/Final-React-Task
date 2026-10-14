import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Not found");
  return (
    <div className="empty">
      <h1>404</h1>
      <p>This page isn't on our menu.</p>
      <Link to="/" className="btn">Back home</Link>
    </div>
  );
}
