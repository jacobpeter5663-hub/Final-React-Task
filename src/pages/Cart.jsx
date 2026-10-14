import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeQty, removeItem, clearCart } from "../store/cartSlice";
import usePageTitle from "../hooks/usePageTitle";
import { money } from "../utils";

export default function Cart() {
  usePageTitle("Cart");
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const [ordered, setOrdered] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.05;

  if (ordered)
    return (
      <div className="empty">
        <h2>🎉 Order placed!</h2>
        <p>Thank you. Your food will be ready shortly.</p>
        <Link to="/menu" className="btn">Order more</Link>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="empty">
        <h2>Your cart is empty</h2>
        <p>Add something delicious from the menu.</p>
        <Link to="/menu" className="btn">Browse menu</Link>
      </div>
    );

  return (
    <>
      <h1>Your Cart</h1>
      <div className="two-col">
        <div>
          {items.map((i) => (
            <div className="card cart-item" key={i.id}>
              <img src={`${i.img}/preview`} alt={i.name} />
              <div className="grow">
                <h3>{i.name}</h3>
                <p className="muted">{money(i.price)} each</p>
                <div className="qty">
                  <button onClick={() => dispatch(changeQty({ id: i.id, qty: i.qty - 1 }))}>−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => dispatch(changeQty({ id: i.id, qty: i.qty + 1 }))}>+</button>
                </div>
              </div>
              <div className="right">
                <strong>{money(i.price * i.qty)}</strong>
                <button className="link-btn" onClick={() => dispatch(removeItem(i.id))}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="card pad summary">
          <h3>Order summary</h3>
          <div className="row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="row"><span>Tax (5%)</span><span>{money(tax)}</span></div>
          <div className="row total"><span>Total</span><span>{money(subtotal + tax)}</span></div>
          <button className="btn full" onClick={() => { dispatch(clearCart()); setOrdered(true); }}>Place order</button>
          <button className="btn outline full" onClick={() => dispatch(clearCart())}>Clear cart</button>
        </aside>
      </div>
    </>
  );
}
