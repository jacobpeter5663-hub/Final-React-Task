import { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import Field from "../components/Field";

const faqs = [
  ["Do you take walk-ins?", "Yes, but reservations are recommended on weekends."],
  ["Is parking available?", "Free parking is available behind the restaurant."],
  ["Do you cater events?", "Yes, contact us at least 7 days in advance."],
];

export default function Contact() {
  usePageTitle("Contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.name.trim()) found.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) found.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) found.message = "Message must be at least 10 characters.";
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <>
      <h1>Contact Us</h1>
      <div className="two-col">
        <form className="card pad" onSubmit={handleSubmit} noValidate>
          {sent && <p className="success">✓ Thanks! We'll get back to you soon.</p>}
          <Field label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
          <Field label="Message" as="textarea" rows="5" name="message" value={form.message} onChange={handleChange} error={errors.message} />
          <button className="btn" type="submit">Send message</button>
        </form>

        <div>
          <div className="card pad">
            <h3>Visit us</h3>
            <p>📍 12 Market Street, Salem</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ hello@spiceroute.example</p>
          </div>
          <h3 className="section-title">FAQ</h3>
          {faqs.map(([q, a], i) => (
            <div className="card pad faq" key={q} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <strong>{q}</strong>
              {openFaq === i && <p className="muted">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
