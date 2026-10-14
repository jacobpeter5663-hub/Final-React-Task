import usePageTitle from "../hooks/usePageTitle";

const team = [
  { name: "Arjun Mehta", role: "Head Chef", emoji: "👨‍🍳" },
  { name: "Lena Fischer", role: "Pastry Chef", emoji: "🧁" },
  { name: "Carlos Diaz", role: "Restaurant Manager", emoji: "🧑‍💼" },
];

const timeline = [
  ["2012", "Opened as a 12-seat street-side kitchen."],
  ["2017", "Moved to our current home and added the garden terrace."],
  ["2022", "Won Best Casual Dining in the city awards."],
  ["2025", "Launched online ordering and table booking."],
];

export default function About() {
  usePageTitle("About");
  return (
    <>
      <h1>Our Story</h1>
      <p className="lead">
        Spice Route began with one idea: great food should feel like a trip you can take on a weeknight.
        We cook with seasonal ingredients, honest spices and a lot of patience.
      </p>

      <h2 className="section-title">Meet the team</h2>
      <div className="grid three">
        {team.map((t) => (
          <div className="card pad center" key={t.name}>
            <div className="big-icon">{t.emoji}</div>
            <h3>{t.name}</h3>
            <p className="muted">{t.role}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Milestones</h2>
      <ul className="timeline">
        {timeline.map(([year, text]) => (
          <li key={year}><strong>{year}</strong><span>{text}</span></li>
        ))}
      </ul>
    </>
  );
}
