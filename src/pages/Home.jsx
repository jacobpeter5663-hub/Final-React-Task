import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePageTitle from "../hooks/usePageTitle";
import Loader from "../components/Loader";
import { API } from "../utils";

const highlights = [
  { icon: "🔥", title: "Fresh & Fiery", text: "Spices ground in-house every morning." },
  { icon: "🥗", title: "Veg Friendly", text: "A full vegetarian menu, not an afterthought." },
  { icon: "⚡", title: "Fast Service", text: "Hot food at your table in under 20 minutes." },
];

export default function Home() {
  usePageTitle("Home");
  const { data, loading, error } = useFetch(`${API}/categories.php`);

  return (
    <>
      <section className="hero">
        <div>
          <span className="pill">Now taking reservations</span>
          <h1>Taste the world, one spice at a time.</h1>
          <p>Welcome to Spice Route — a modern restaurant serving bold, comforting dishes from every corner of the map.</p>
          <div className="row gap">
            <Link to="/menu" className="btn">View Menu</Link>
            <Link to="/reservations" className="btn outline">Book a Table</Link>
          </div>
        </div>
        <img
          src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"
          alt="Signature dish"
        />
      </section>

      <section className="grid three">
        {highlights.map((h) => (
          <div className="card pad center" key={h.title}>
            <div className="big-icon">{h.icon}</div>
            <h3>{h.title}</h3>
            <p className="muted">{h.text}</p>
          </div>
        ))}
      </section>

      <h2 className="section-title">Explore categories</h2>
      {loading && <Loader />}
      {error && <p className="error-box">{error}</p>}
      {data && (
        <div className="grid cats">
          {data.categories.slice(0, 8).map((c) => (
            <Link to={`/menu/${c.strCategory}`} className="card cat-card" key={c.idCategory}>
              <img src={c.strCategoryThumb} alt={c.strCategory} />
              <h3>{c.strCategory}</h3>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
