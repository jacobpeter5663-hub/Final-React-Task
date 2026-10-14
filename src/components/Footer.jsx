export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Spice Route Restaurant · Open daily 11 AM – 11 PM</p>
        <p className="muted">Meal data by TheMealDB · Built with React</p>
      </div>
    </footer>
  );
}
