import { forwardRef } from "react";

// Reusable labelled input with an inline error message
const Field = forwardRef(function Field({ label, error, as = "input", ...props }, ref) {
  const Tag = as;
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label>{label}</label>
      <Tag ref={ref} {...props} />
      {error && <small className="error">{error}</small>}
    </div>
  );
});

export default Field;
