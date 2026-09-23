import { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import CartBadge from "./cart/CartBadge";
import CartPanel from "./cart/CartPanel";
import ThemeToggle from "./theme/ThemeToggle";

import { useAuth } from "./auth/AuthProvider";

function Layout() {
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">
              🍴
            </span>

            <span className="brand-text">
              <strong>Addis Eats</strong>

              <small>
                Eat Local. Eat Happy.
              </small>
            </span>
          </Link>

          <nav className="main-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
              end
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Favorites
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Orders
              </NavLink>
            )}
          </nav>

          <div className="header-actions">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                  title={user?.email}
                >
                  Hi, {user?.name}
                </span>

                <button
                  type="button"
                  className="button button-small button-secondary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="button button-small button-secondary"
              >
                Sign In
              </Link>
            )}

            <CartBadge
              onClick={() => setCartOpen(true)}
            />
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <Link
              to="/"
              className="footer-brand"
            >
              🍴 Addis Eats
            </Link>

            <p>
              Delicious food from Addis, delivered
              with care.
            </p>
          </div>

          <div className="footer-links">
            <Link to="/menu">
              Menu
            </Link>

            <Link to="/favorites">
              Favorites
            </Link>

            <Link to="/orders">
              Orders
            </Link>
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} Addis Eats
          </div>
        </div>
      </footer>

      <CartPanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}

export default Layout;