import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [error, setError] = useState("");

  const from = location.state?.from || "/";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (name.length < 2) {
      setError("Your name must contain at least 2 characters.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    login(name, email);

    navigate(from, {
      replace: true,
    });
  }

  return (
    <main className="page-section">
      <div className="container">
        <div
          style={{
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          <div className="page-heading">
            <div>
              <span className="eyebrow">
                Welcome to Addis Eats
              </span>

              <h1>Sign in to continue</h1>

              <p>
                Sign in to checkout, view your orders,
                and enjoy a smoother Addis Eats experience.
              </p>
            </div>
          </div>

          <form
            className="checkout-card"
            onSubmit={handleSubmit}
          >
            <div className="checkout-card-heading">
              <span className="checkout-step">
                👤
              </span>

              <div>
                <h2>Your Account</h2>
                <p>
                  Enter your details to continue.
                </p>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="login-name">
                Full Name
                <span className="required-mark">
                  *
                </span>
              </label>

              <input
                id="login-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="login-email">
                Email Address
                <span className="required-mark">
                  *
                </span>
              </label>

              <input
                id="login-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {error && (
              <div className="field-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="button button-primary"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
              Sign In
            </button>

            <p
              style={{
                textAlign: "center",
                marginTop: "18px",
              }}
            >
              <Link to="/menu">
                Continue browsing the menu
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;