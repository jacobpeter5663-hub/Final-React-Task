import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { addItem } from "../store/cartSlice";
import { API, priceOf, money } from "../utils";

export default function MealDetail() {
  const { category, mealId } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { data, loading, error } = useFetch(`${API}/lookup.php?i=${mealId}`);

  if (loading) return <Loader />;
  if (error) return <p className="error-box">{error}</p>;

  const meal = data?.meals?.[0];
  if (!meal) return <p className="empty">Dish not found.</p>;

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((n) => [meal[`strIngredient${n}`], meal[`strMeasure${n}`]])
    .filter(([name]) => name && name.trim());

  const price = priceOf(meal.idMeal);

  const handleAdd = () => {
    dispatch(addItem({ id: meal.idMeal, name: meal.strMeal, img: meal.strMealThumb, price, qty }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="detail">
      <Link to={`/menu/${category}`} className="back">← Back to {category}</Link>
      <div className="detail-grid">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div>
          <h2>{meal.strMeal}</h2>
          <p className="muted">{meal.strCategory} · {meal.strArea}</p>
          <p className="price big">{money(price)}</p>

          <div className="row gap">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn" onClick={handleAdd}>Add to cart</button>
          </div>
          {added && <p className="success">✓ Added to your cart</p>}

          <h3>Ingredients</h3>
          <ul className="ingredients">
            {ingredients.map(([name, measure]) => (
              <li key={name}>{measure} {name}</li>
            ))}
          </ul>
        </div>
      </div>
      <h3>Instructions</h3>
      <p className="instructions">{meal.strInstructions}</p>
    </div>
  );
}
