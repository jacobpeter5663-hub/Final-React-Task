# Spice Route – Restaurant Frontend (React)

## Run
    npm install
    npm run dev

## Routes
- `/` Home (API categories)
- `/menu` → `/menu/:category` → `/menu/:category/:mealId` (nested routing, API list + detail)
- `/reservations` CRUD + validation (useReducer)
- `/cart` Redux cart
- `/about`, `/contact`, `*` (404)

## Concepts used
Components, Props, useState, useEffect, useRef (auto-focus), useContext (ThemeContext),
useReducer (reservations CRUD), Redux Toolkit (cart), custom hooks (useFetch, useLocalStorage,
usePageTitle), React Router (nested routes, useParams, useSearchParams), conditional + list rendering,
API integration (TheMealDB), form validation, responsive CSS.
