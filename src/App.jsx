import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import MenuList from "./pages/MenuList";
import MealDetail from "./pages/MealDetail";
import Reservations from "./pages/Reservations";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* Nested routing: /menu/:category and /menu/:category/:mealId */}
        <Route path="menu" element={<Menu />}>
          <Route index element={<Navigate to="Chicken" replace />} />
          <Route path=":category" element={<MenuList />} />
          <Route path=":category/:mealId" element={<MealDetail />} />
        </Route>

        <Route path="reservations" element={<Reservations />} />
        <Route path="cart" element={<Cart />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
