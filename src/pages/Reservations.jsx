import { useReducer, useRef, useState, useEffect } from "react";
import usePageTitle from "../hooks/usePageTitle";
import useLocalStorage from "../hooks/useLocalStorage";
import Field from "../components/Field";

// ---- useReducer: full CRUD for reservations ----
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { ...action.payload, id: Date.now() }];
    case "update":
      return state.map((r) => (r.id === action.payload.id ? action.payload : r));
    case "delete":
      return state.filter((r) => r.id !== action.id);
    default:
      return state;
  }
}

const empty = { name: "", phone: "", date: "", time: "", guests: 2 };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name (min 2 characters).";
  if (!/^\d{10}$/.test(v.phone)) e.phone = "Phone number must be exactly 10 digits.";
  if (!v.date) e.date = "Choose a date.";
  else if (new Date(v.date) < new Date(new Date().toDateString())) e.date = "Date cannot be in the past.";
  if (!v.time) e.time = "Choose a time.";
  if (v.guests < 1 || v.guests > 12) e.guests = "Guests must be between 1 and 12.";
  return e;
}

export default function Reservations() {
  usePageTitle("Reservations");
  const [saved, setSaved] = useLocalStorage("reservations", []);
  const [list, dispatch] = useReducer(reducer, saved);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const nameRef = useRef(null); // useRef: focus the first field

  useEffect(() => setSaved(list), [list]); // persist after every change
  useEffect(() => nameRef.current?.focus(), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "guests" ? Number(value) : value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    if (editingId) dispatch({ type: "update", payload: { ...form, id: editingId } });
    else dispatch({ type: "add", payload: form });

    setForm(empty);
    setEditingId(null);
    nameRef.current?.focus();
  };

  const startEdit = (r) => {
    setForm(r);
    setEditingId(r.id);
    setErrors({});
    nameRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  return (
    <>
      <h1>Reserve a Table</h1>
      <div className="two-col">
        <form className="card pad" onSubmit={handleSubmit} noValidate>
          <h3>{editingId ? "Edit reservation" : "New reservation"}</h3>
          <Field ref={nameRef} label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
          <Field label="Phone" name="phone" inputMode="numeric" maxLength={10} value={form.phone} onChange={handleChange} error={errors.phone} />
          <div className="row gap">
            <Field label="Date" type="date" name="date" value={form.date} onChange={handleChange} error={errors.date} />
            <Field label="Time" type="time" name="time" value={form.time} onChange={handleChange} error={errors.time} />
          </div>
          <Field label="Guests" type="number" name="guests" min="1" max="12" value={form.guests} onChange={handleChange} error={errors.guests} />
          <div className="row gap">
            <button className="btn" type="submit">{editingId ? "Save changes" : "Book table"}</button>
            {editingId && <button type="button" className="btn outline" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>

        <div>
          <h3>Your reservations ({list.length})</h3>
          {list.length === 0 ? (
            <p className="empty">No reservations yet. Book your first table!</p>
          ) : (
            list.map((r) => (
              <div className="card pad res-item" key={r.id}>
                <div>
                  <strong>{r.name}</strong>
                  <p className="muted">📅 {r.date} at {r.time} · 👥 {r.guests} · 📞 {r.phone}</p>
                </div>
                <div className="row gap">
                  <button className="btn small outline" onClick={() => startEdit(r)}>Edit</button>
                  <button className="btn small danger" onClick={() => dispatch({ type: "delete", id: r.id })}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
