import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAdminAuth } from "./useAdminAuth";

function AdminLayout() {
  const navigate = useNavigate();

  const {
    admin,
    logout,
  } = useAdminAuth();

  function handleLogout() {
    logout();
    navigate("/admin/login", {
      replace: true,
    });
  }

  return (
    <main className="page-section">
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "240px minmax(0, 1fr)",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <aside className="checkout-card">
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <span className="eyebrow">
                Administration
              </span>

              <h2
                style={{
                  margin: "6px 0",
                }}
              >
                Addis Eats
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                }}
              >
                {admin?.email}
              </p>
            </div>

            <nav
              style={{
                display: "grid",
                gap: "8px",
              }}
            >
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive
                    ? "button button-primary"
                    : "button button-secondary"
                }
              >
                📊 Dashboard
              </NavLink>

              <NavLink
                to="/admin/dishes"
                className={({ isActive }) =>
                  isActive
                    ? "button button-primary"
                    : "button button-secondary"
                }
              >
                🍽️ Dishes
              </NavLink>

              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  isActive
                    ? "button button-primary"
                    : "button button-secondary"
                }
              >
                🧾 Orders
              </NavLink>
            </nav>

            <button
              type="button"
              className="button button-secondary"
              onClick={handleLogout}
              style={{
                width: "100%",
                marginTop: "16px",
              }}
            >
              Logout
            </button>
          </aside>

          <section>
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
}

export default AdminLayout;