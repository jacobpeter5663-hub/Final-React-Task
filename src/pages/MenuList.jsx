import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import MealCard from "../components/MealCard";
import { API } from "../utils";

export default function MenuList() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const sort = params.get("sort") || "default";

  const { data, loading, error } = useFetch(`${API}/filter.php?c=${category}`);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  let meals = data?.meals ?? [];
  meals = meals.filter((m) => m.strMeal.toLowerCase().includes(q.toLowerCase()));
  if (sort === "az") meals = [...meals].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  if (sort === "za") meals = [...meals].sort((a, b) => b.strMeal.localeCompare(a.strMeal));

  return (
    <>
      <div className="toolbar">
        <input
          type="search"
          placeholder={`Search ${category} dishes...`}
          value={q}
          onChange={(e) => update("q", e.target.value)}
        />
        <select value={sort} onChange={(e) => update("sort", e.target.value === "default" ? "" : e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="az">Name A → Z</option>
          <option value="za">Name Z → A</option>
        </select>
      </div>

      {loading && <Loader text={`Loading ${category}...`} />}
      {error && <p className="error-box">{error}</p>}
      {!loading && !error && meals.length === 0 && (
        <p className="empty">No dishes match “{q}”. Try another search.</p>
      )}

      <div className="grid meals">
        {meals.map((m) => (
          <MealCard key={m.idMeal} meal={m} category={category} />
        ))}
      </div>
    </>
  );
}
