export const CATEGORIES = ["Chicken", "Seafood", "Vegetarian", "Pasta", "Dessert"];
export const API = "https://www.themealdb.com/api/json/v1/1";

// TheMealDB has no prices, so derive a stable one from the meal id
export const priceOf = (id) => 8 + (Number(id) % 12) + 0.99;
export const money = (n) => `$${n.toFixed(2)}`;
