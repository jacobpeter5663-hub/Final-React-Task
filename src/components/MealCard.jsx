import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { priceOf, money } from "../utils";

export default function MealCard({ meal, category }) {
  const dispatch = useDispatch();
  const price = priceOf(meal.idMeal);

  return (
    <article className="card meal-card">
      <Link to={`/menu/${category}/${meal.idMeal}`}>
        <img src={`${meal.strMealThumb}/preview`} alt={meal.strMeal} loading="lazy" />
      </Link>
      <div className="card-body">
        <h3>{meal.strMeal}</h3>
        <div className="row">
          <strong className="price">{money(price)}</strong>
          <button
            className="btn small"
            onClick={() =>
              dispatch(addItem({ id: meal.idMeal, name: meal.strMeal, img: meal.strMealThumb, price }))
            }
          >
            Add +
          </button>
        </div>
      </div>
    </article>
  );
}
