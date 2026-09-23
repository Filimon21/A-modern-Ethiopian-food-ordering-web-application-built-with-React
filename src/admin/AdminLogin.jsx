import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  useAdminAuth,
} from "./useAdminAuth";

function AdminLogin() {
  const navigate = useNavigate();

  const { login } = useAdminAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

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

    if (!form.email.trim()) {
      setError("Please enter the admin email.");
      return;
    }

    if (!form.password) {
      setError("Please enter the admin password.");
      return;
    }

    const result = login(
      form.email,
      form.password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/admin", {
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
                Addis Eats Administration
              </span>

              <h1>Admin Login</h1>

              <p>
                Sign in to manage dishes and customer
                orders.
              </p>
            </div>
          </div>

          <form
            className="checkout-card"
            onSubmit={handleSubmit}
          >
            <div className="checkout-card-heading">
              <span className="checkout-step">
                🔐
              </span>

              <div>
                <h2>Administrator Access</h2>

                <p>
                  Use your administrator credentials
                  to continue.
                </p>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="admin-email">
                Email
                <span className="required-mark">
                  *
                </span>
              </label>

              <input
                id="admin-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@addiseats.com"
                autoComplete="username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="admin-password">
                Password
                <span className="required-mark">
                  *
                </span>
              </label>

              <input
                id="admin-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter admin password"
                autoComplete="current-password"
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
              Sign In to Admin
            </button>

            <div
              style={{
                marginTop: "20px",
                padding: "14px",
                borderRadius: "12px",
                background: "var(--blue-light)",
                fontSize: "13px",
              }}
            >
              <strong>Demo Admin Credentials</strong>

              <p style={{ margin: "8px 0 0" }}>
                Email: {ADMIN_EMAIL}
                <br />
                Password: {ADMIN_PASSWORD}
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;