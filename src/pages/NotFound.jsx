import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-number">
        404
      </div>

      <span className="eyebrow">
        PAGE NOT FOUND
      </span>

      <h1>Looks like you took a wrong turn.</h1>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <Link className="btn btn-primary" to="/">
        Back to Addis Eats
      </Link>
    </section>
  );
}